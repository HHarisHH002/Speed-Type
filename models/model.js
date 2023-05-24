let mongoose=require("mongoose");
var regSchema = new mongoose.Schema({
    username: String,
    password: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    plays:{
        type:Number,
        default:0
    },
    max15score:{
        maxaccuracy:{
            type:Number,
            default:0
        },
        maxwpm:{
            type: Number,
            default:0
        },
        maxsec:{
            type: Number,
            default:15
        },
        maxdate:{
            type:String,
        },
        maxcategory:{
            type:String,
            default:'words'
        }
    },
    max30score:{
        maxaccuracy:{
            type:Number,
            default:0
        },
        maxwpm:{
            type: Number,
            default:0
        },
        maxsec:{
            type: Number,
            default:15
        },
        maxdate:{
            type:String,
        },
        maxcategory:{
            type:String,
            default:'words'
        }
    },
    max60score:{
        maxaccuracy:{
            type:Number,
            default:0
        },
        maxwpm:{
            type: Number,
            default:0
        },
        maxsec:{
            type: Number,
            default:15
        },
        maxdate:{
            type:String,
        },
        maxcategory:{
            type:String,
            default:'words'
        }
    },
    rank15sec:{
        type: Number,
        default:0
    },
    rank30sec:{
        type: Number,
        default:0
    },
    rank60sec:{
        type: Number,
        default:0
    },
    data:[
        {
        
        accuracy:{
            type:Number,
            default:0
        },
        wpm:{
            type: Number,
            default:0
        },
        date:{
            type:String,
            
        },
        sec:{
            type: Number,
            default:15
        },
        category:{
            type:String,
            default:'words'
        }
}
],
    
});
let register=module.exports= mongoose.model("Registers", regSchema);