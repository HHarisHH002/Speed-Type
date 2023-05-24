

var app=angular.module("myApp",["ngRoute"])
app.controller('wordsCtrl', function($scope,$http) {
  $scope.type = function(choice){ $http.get("typing.json")
   .then(function(res) {
    document.getElementById("text-given").innerHTML = res.data[choice][Math.floor(Math.random() * res.data[choice].length)].data;
   })
 }});        

 app.controller('indexCtrl', function($scope,$http) {
  $scope.type = function(choice){ $http.get("typing.json")
   .then(function(res) {
    document.getElementById("text-given").innerHTML = res.data[choice][Math.floor(Math.random() * res.data[choice].length)].data;
   })
 }});  
app.config(function($routeProvider) {

  $routeProvider
  .when("/punctuations", {
    template: `<p ng-init="type('punctuations')"></p>`,
    controller : "wordsCtrl"
  })
  .when("/numbers", {
    template: `<p ng-init="type('numbers')"></p>`,
    controller : "wordsCtrl"
  })
  .when("/words", {
    template: `<p ng-init="type('words')"></p>`,
    controller : "wordsCtrl"
  })
});



// app.controller('wordsCtrl', function($scope,$http) {
//   $http.get("typing.json")
//    .then(function(response) {
//     this.d=response.data
//     this.d=d["words"]
//     giventext=document.getElementById("text-given")
//     giventext.innerHTML = d[Math.floor(Math.random() * d.length)].data;
    
//  });          
// });
// app.controller('punctuationsCtrl', function($scope,$http) {
//   $http.get("typing.json")
//    .then(function(response) {
//     this.d=response.data
//     this.d=d["punctuations"]
//     giventext=document.getElementById("text-given")
//     giventext.innerHTML = d[Math.floor(Math.random() * d.length)].data;
//     console.log(giventext.innerHTML)
//  });          
// });
// app.controller('numbersCtrl', function($scope,$http) {
//   $http.get("typing.json")
//    .then(function(response) {
//     this.d=response.data
//     this.d=d["numbers"]
//     giventext=document.getElementById("text-given")
//     giventext.innerHTML = d[Math.floor(Math.random() * d.length)].data;
//     console.log(giventext.innerHTML)
//  });          
// });



giventext=document.getElementById("text-given")
inputtext=document.getElementById("text-input")
const screen=document.getElementById("screen")
const typingscreen = document.getElementById("typing-screen");

window.onload=choosetype('words')
window.onload=choosetime('sec15')

var noofcorrect=0
var noofincorrect=0
var prevcorrect=0
var x_wpm =[]
var y_sec =[]
var totalletters;
var WPM,accuracy;
var time=15;
var category='words'


function choosetype(ids){
  if(ids==="punctuation"){
    category='punctuation'
    document.getElementById('numbers').style.color= "black";
    document.getElementById('words').style.color= "black";
  }
  else if(ids==="numbers"){
    category='numbers'
    document.getElementById('punctuation').style.color= "black";
    document.getElementById('words').style.color= "black";
  }
  else{
    category='words'
    document.getElementById('punctuation').style.color= "black";
    document.getElementById('numbers').style.color= "black";
  }
  document.getElementById(ids).style.color= "#FECC01";
  document.getElementById(ids).style.opacity=1;
  document.getElementById('text-input').focus();
  
}

function choosetime(ids){

  if(ids==="sec15"){
    time=15
    document.getElementById('sec30').style.color= "black";
    document.getElementById('sec60').style.color= "black";
  }
  else if(ids==="sec30"){
    time=30
    document.getElementById('sec15').style.color= "black";
    document.getElementById('sec60').style.color= "black";
  }
  else{
    time=60
    document.getElementById('sec15').style.color= "black";
    document.getElementById('sec30').style.color= "black";
  }
  document.getElementById(ids).style.color= "#FECC01";
  document.getElementById('text-input').focus();
  
}

inputtext.addEventListener('input',()=>{
  text=giventext.innerText
  giventext.innerText=''
  text.split('').forEach(character => {
      const characterspan=document.createElement('span')
      characterspan.innerHTML=character
      giventext.appendChild(characterspan)
  });

    document.getElementById('countdown').style.opacity=1;
    document.getElementById('options-screen').style.opacity=0;
    giventext.removeAttribute('id');
    const arraytext=giventext.querySelectorAll('span')
    const arrayinput=inputtext.value.split('')
    totalletters=arrayinput.length;
   
    noofcorrect=0;
    noofincorrect=0;
    arraytext.forEach((characterspan,index)=>{
        character=arrayinput[index]
        if (character == null) {
            characterspan.classList.remove('correct')
            characterspan.classList.remove('incorrect')
            characterspan.classList.add('textopacity')

        }
        else if(character===characterspan.innerText){
            
            characterspan.classList.add('correct')
            characterspan.classList.remove('incorrect')
            
            noofcorrect+=1
            noofincorrect+=1
            
        }
        else{
            characterspan.classList.add('incorrect')
            characterspan.classList.remove('correct')
        }
    })
    // console.log(noofcorrect)
}
)


var isgamestarted=0
function timmer(){
  
  console.log(time)
  if(isgamestarted==0){
    document.getElementById("timer-animation").style.animation='countdown ' + time + 's';
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = time;

    var sec=1;
    countdownNumberEl.textContent = countdown;
    interval=setInterval(function() {
      countdown = --countdown < 0 ? StopFunction(time): countdown;
      countdownNumberEl.textContent = countdown;
      x_wpm.push((noofcorrect-prevcorrect)*12);
      y_sec.push(sec);

      sec+=1;
      prevcorrect=noofcorrect;
    }, 1000);
    isgamestarted=1
}
}

function StopFunction(time) {
  
  
  console.log(x_wpm,y_sec)
  WPM=Math.floor(noofcorrect/((1/60)*5*time))
  accuracy=Math.floor((noofcorrect/totalletters)*100);
  console.log(WPM,accuracy)
  clearInterval(interval);
  window.location.href ="/resultscore?wpm="+WPM+"&accuracy="+accuracy+'&xvalues='+x_wpm+'&yvalues='+y_sec;

}

function logintimmer(){
  
  console.log(time)
  if(isgamestarted==0){
    document.getElementById("timer-animation").style.animation='countdown ' + time + 's';
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = time;

    var sec=1;
    countdownNumberEl.textContent = countdown;
    interval=setInterval(function() {
      countdown = --countdown < 0 ? loginStopFunction(time,category): countdown;
      countdownNumberEl.textContent = countdown;
      x_wpm.push((noofcorrect-prevcorrect)*12);
      y_sec.push(sec);

      sec+=1;
      prevcorrect=noofcorrect;
    }, 1000);
    isgamestarted=1
}
}

function loginStopFunction(time) {
  username=document.getElementById("username").innerText
  console.log(category)
  console.log(x_wpm,y_sec)
  WPM=Math.floor(noofcorrect/((1/60)*5*time))
  accuracy=Math.floor((noofcorrect/totalletters)*100);
  console.log(WPM,accuracy)
  clearInterval(interval);
  window.location.href ="/result?username="+username+"&wpm="+WPM+"&accuracy="+accuracy+'&sec='+time+'&category='+category+'&xvalues='+x_wpm+'&yvalues='+y_sec;
}

function reloadpage(){
  window.location.href ="/";
}
var urlParams = new URLSearchParams(window.location.search);
var username=urlParams.get('username');


var user=document.getElementById('username').innerText;
function statspage(){
  window.location.href ="/stats?username="+user;
}
function loginreloadpage(){
  window.location.href ="/index?username="+user;
}

function scoretablepage(){
  window.location.href ="/scoretable?choosensec="+15+"&username="+user;
}
// console.log(x_wpm.toString)
// console.log(y_sec.toString)
function closepopup(){
  document.getElementById('invalid-idpopup').style.opacity=0;
  document.getElementById('text-input').focus();
}

function closed(){

  document.getElementById('screen').classList.remove('blur')
  document.getElementById('restart').classList.remove('blur')
  document.getElementById('screen').classList.remove('disable-div')
  document.getElementById('login-popup').style.visibility= "hidden";
  document.getElementById('register-popup').style.visibility= "hidden";
  document.getElementById('text-input').focus();
  document.getElementById("registerform").reset();
  document.getElementById("loginform").reset();
}
function loginafter(){
  document.getElementById('invalid-idpopup').style.opacity=0
  document.getElementById('invalid-idpopup').style.visibility="hidden"
  document.getElementById('register-popup').style.visibility= "hidden";
  document.getElementById('screen').classList.add('blur')
  document.getElementById('screen').classList.add('disable-div')
  document.getElementById('restart').classList.add('blur')
  document.getElementById('login-popup').style.visibility="visible"
  document.getElementBy("registerform").reset();
}
function registerafter(){
  document.getElementById('invalid-idpopup').style.opacity=0
  document.getElementById('invalid-idpopup').style.visibility="hidden"
  document.getElementById('screen').classList.add('blur')
  document.getElementById('screen').classList.add('disable-div')
  document.getElementById('restart').classList.add('blur')
  document.getElementById('login-popup').style.visibility= "hidden";
  document.getElementById('register-popup').style.visibility="visible"
  document.getElementById("loginform").reset();
}
function login(){
  document.getElementById('login-popup').style.visibility="visible"
  document.getElementById('register-popup').style.visibility= "hidden";
  document.getElementById('screen').classList.add('blur')
  document.getElementById('screen').classList.add('disable-div')
  document.getElementById('restart').classList.add('blur')
  document.getElementById('login-popup').style.visibility="visible"
  document.getElementById("registerform").reset();
  document.getElementById("loginform").reset();
}

function register(){
  document.getElementById('screen').classList.add('blur')
  document.getElementById('screen').classList.add('disable-div')
  document.getElementById('restart').classList.add('blur')
  document.getElementById('login-popup').style.visibility= "hidden";
  document.getElementById('register-popup').style.visibility="visible"
  document.getElementById("loginform").reset();
  document.getElementById("registerform").reset();
}


var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

