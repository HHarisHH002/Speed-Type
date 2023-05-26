const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var session = require('express-session');
var flash=require('connect-flash')
var cookieParser = require('cookie-parser');
const uuid = require("uuid");
const fs = require("fs");
const multer = require("multer");
let register=require('./models/model')

mongoose.connect("mongodb+srv://harish002:csSniTZAddVqnLkI@speedtype.s0pmbkw.mongodb.net/?retryWrites=true&w=majority", {
    dbName: "SpeedType",
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) =>
err ? console.log(err) : console.log(
  "Connected to SpeedType database")
  );
const sessions = {};
var app=express()
app.set("view engine", "ejs");
const path = require('path')
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
// Express Session Middleware
app.use(session({
    secret: 'secret',
    cookie:{ maxAge:60000},
    resave: true,
    saveUninitialized: true
  }));
// Express Messages Middleware
app.use(flash())

app.get('/',function(req,res){
    res.render('home',{items:0,isvalid:1,username:""});
})

app.get('/scoretable',function(req,res){
    var scoresec=req.query.choosensec
    if(scoresec==60){
        var details =register.find({'rank60sec':{$gt : 0},'max60score.maxwpm':{$gt : 0}}).sort({ 'rank60sec': 1 }).limit(10);
    }
    else if(scoresec==30){
        var details =register.find({'rank30sec':{$gt : 0},'max30score.maxwpm':{$gt : 0}}).sort({ 'rank30sec': 1 }).limit(10);
    }
    else{
        var details =register.find({'rank15sec':{$gt : 0},'max15score.maxwpm':{$gt : 0}}).sort({ 'rank15sec': 1 }).limit(10);
    }
  
details.exec(function(err,data){
            if(err) throw err;
            res.render('scoretable', {scoredetails:data,username:req.query.username,scoresec:req.query.choosensec});
              });
})
app.get('/index',function(req,res){
    const sessionToken = req.cookies["session_token"];
    const currentUserSession = sessions[sessionToken];
    var details =register.findOne({username:req.query.username});
    details.exec(function(err,data){
            if(err) throw err;
            res.render('index', {items:data,username:req.query.username});
              });
})

app.get('/stats',function(req,res){
    user=req.query.username
    var values=[]
    if(req.query.viewuser){
        user=req.query.viewuser
    }
    var details =register.findOne({username:user});
    details.exec(function(err,datas){
        var p=1
        datas.data.forEach((eachwpm)=>{
            values.push({'x':p,'y':eachwpm.wpm})
            p=p+1
        })
        if(err) throw err;
        res.render('stats',{statsdetails:datas,value:values});
          });
    
})
app.get('/resultscore',function(req,res){
    res.render('result')
})
app.get('/result',async function(req,res){
    var choosentime=req.query.sec
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const fdate=today.toDateString().slice(4,10)+', '+today.toDateString().slice(11);

    let updateresults={
        wpm:req.query.wpm,
        accuracy:req.query.accuracy,
        sec:req.query.sec,
        category:req.query.category,
        date:fdate
    }
    var details =register.findOne({username:req.query.username});
    if(choosentime==15){
    
            details.exec(async function(err,data){

                var maxwpm=data.max15score.maxwpm;
                var maxaccuracy=data.max15score.maxaccuracy;

                if(data.max15score.maxwpm<=req.query.wpm){
                    var maxwpm=req.query.wpm
                    var maxaccuracy=req.query.accuracy
                    var maxcategory=req.query.category
                    var maxsec=req.query.sec
                    var maxdate=fdate
                }
                var plays=data.plays+1

                var ranking=1;
            register.updateOne({username:req.query.username},{$push:{data:updateresults}}).exec()
            await register.updateOne({username:req.query.username},{$set:{'max15score.maxwpm':maxwpm,'max15score.maxaccuracy':maxaccuracy,'max15score.maxsec':maxsec,'max15score.maxdate':maxdate,'max15score.maxcategory':maxcategory,plays:plays}}).exec()
            await register.find({}).sort({'max15score.maxwpm':-1,'max15score.maxaccuracy':-1}).exec((err, results) => {
            console.log(results)
                results.forEach((result) => {
                    register.updateOne(
                        {username : result.username},
                        {$set : {rank15sec : ranking}
                    }).exec()
                ranking+=1
                });
            });
            
        });
    }
    else if(choosentime==30){
        details.exec(async function(err,data){

            var maxwpm=data.max30score.maxwpm;
            var maxaccuracy=data.max30score.maxaccuracy;

            if(data.max30score.maxwpm<=req.query.wpm){
                var maxwpm=req.query.wpm
                var maxaccuracy=req.query.accuracy
                var maxcategory=req.query.category
                var maxsec=req.query.sec
                var maxdate=fdate
            }
            var plays=data.plays+1
            var ranking=1;
        register.updateOne({username:req.query.username},{$push:{data:updateresults}}).exec()
        await register.updateOne({username:req.query.username},{$set:{'max30score.maxwpm':maxwpm,'max30score.maxaccuracy':maxaccuracy,'max30score.maxsec':maxsec,'max30score.maxdate':maxdate,'max15score.maxcategory':maxcategory,plays:plays}}).exec()
        await register.find({}).sort({'max30score.maxwpm':-1,'max30score.maxaccuracy':-1}).exec((err, results) => {
            console.log(results)
            results.forEach((result) => {
                register.updateOne(
                    {username : result.username},
                    {$set : {rank30sec : ranking}
                }).exec()
            ranking+=1
            });
        });
        
    });
    }
    else if(choosentime==60){
        details.exec(async function(err,data){
            var maxwpm=data.max60score.maxwpm;
            var maxaccuracy=data.max60score.maxaccuracy;
            if(data.max60score.maxwpm<=req.query.wpm){
                var maxwpm=req.query.wpm
                var maxaccuracy=req.query.accuracy
                var maxcategory=req.query.category
                var maxsec=req.query.sec
                var maxdate=fdate
            }
            var plays=data.plays+1

            var ranking=1;
        register.updateOne({username:req.query.username},{$push:{data:updateresults}}).exec()
        await register.updateOne({username:req.query.username},{$set:{'max60score.maxwpm':maxwpm,'max60score.maxaccuracy':maxaccuracy,'max60score.maxsec':maxsec,'max60score.maxdate':maxdate,'max60score.maxcategory':maxcategory,plays:plays}}).exec()
    await register.find({'max60score.maxwpm':{$gt : 0}}).sort({'max60score.maxwpm':-1,'max60score.maxaccuracy':-1}).exec((err, results) => {
            results.forEach((result) => {
                register.updateOne(
                    {username : result.username},
                    {$set : {rank60sec : ranking}
                }).exec()
            ranking+=1
            });
        });
        
    });
    }
    res.render('result')
})


app.post('/login',function(req,res){
    var logindetails =register.findOne({username:req.body.username});
    logindetails.exec(function(err,data){
            
            if(err) throw err;
            if(data==null){
                res.render('home', {isvalid:0,message:"Username doesnot exsist",error:"Invalid Login!!"});
            }
            else{if(data.password==req.body.password){
                const sessionToken = uuid.v4();
                const expiresAt = new Date().setFullYear(new Date().getFullYear() + 1);
              
                sessions[sessionToken] = {
                  expiresAt,
                  userId: req.body.username,
                };
              
                res.cookie("session_token", sessionToken, { maxAge: expiresAt });

            res.render('index', {items:data,isvalid:1,username:req.body.username});
            }
            else{
                res.render('home', {isvalid:0,message:"Password doesnot match with username",error:"Invalid Login!!"});
            }}
              });
   
    });

app.post('/register',upload.single('profilepic'),function(req,res){
    if(req.body.profilepic){
    var reg = new register({
        username: req.body.username,
        password: req.body.password,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType:'image/png'
        }
    })}
    else{
        var reg = new register({
            username: req.body.username,
            password: req.body.password,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/public/images/account.png')),
                contentType:'image/png'
            }
        })
    }
    var logindetails =register.findOne({username:req.body.username});
    logindetails.exec(function(err,data){

        if(data!=null){
            
            res.render('home', {isvalid:-1,message:"Username Already exists",error:"Invalid Registration!!"});
        }
    else{
    reg.save(function(err){
        if (err) {
            console.log(err);
        }
        else {
            var logindetail =register.findOne({username:req.body.username});
            logindetail.exec(function(err,data){
                if(err) throw err;
                res.render('index', {items:data,isvalid:1,username:req.body.username});
                  });
        }
    });
}
})
})

app.listen(8000)
console.log("Listening port 8000.....")