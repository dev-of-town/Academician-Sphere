const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required :[true,'Username cannot be empty']
    },
    password :{
        type : String,
        required :[true,'Password cannot be empty']
    },
    mail :{
        type :String,
        required :[true,'mail cannot be empty']
    },
    dob :{
        type :Date
    },
    profile_img :{
        type :String,
        default :'https://www.doyonutilities.com/wp-content/uploads/profile-icon.png'
    },
    background_img :{
        type :String,
        default :'https://www.doyonutilities.com/wp-content/uploads/profile-icon.png'
    },
    communities :[
        {
            community_id:{
                type:Number,
                default:0
            },
            joining_dt:{
                type:Date,
            }
        }
    ],
    education :[
        {
            institute_id:{
                type:Number,
                default:-1
            },
            start:{
                type:String,
                default:''
            },
            end:{
                type:String,
                default:''
            },
            degree:{
                type:String,
                default:''
            },
            field:{
                type:String,
                default:''
            },
            specialization:[String]

        }
    ],
    skills :[{
        skill:{
            type:'String',
            default:''
        },
        level:{
            type:'String',
            default:''
        },
    }],
    experience :[
        {
            company_name :{
                type:String,
                default:''
            },
            joining_dt :{
                type:Date
            },
            end_dt :{
                type:Date
            },
            job_role :{
                type:String,
                default:''
            },
            description :{
                type:String,
                default:''
            },
        }
    ],
    posts :[String],
    saved_posts :[
        {
            post_id :{
                type:String
            },
            dt :{
                type:Date
            }
        }
    ],
    liked_posts :[
        {
            post_id :{
                type:String
            },
            dt :{
                type:Date
            }
        }
    ],
    comment :[String],
    followers :[String],
    following :[String],
});

module.exports = mongoose.model('Users',userSchema);