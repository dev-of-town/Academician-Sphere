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
        filename: {
            type :String,
            default :'defaults/default-profile.png'
        },
        url: {
            type :String,
            default :'https://res.cloudinary.com/dbrt4m9x8/image/upload/v1697869577/defaults/default-profile.png'    
        }
    },
    background_img :{
        filename: {
            type :String,
            default :'defaults/default-background.jpg'
        },
        url: {
            type :String,
            default :'https://res.cloudinary.com/dbrt4m9x8/image/upload/v1697869577/defaults/default-background.jpg'    
        }
    },
    bio: {
        type: String
    },
    links: [
        {
            name: {
                type: String
            },
            link: {
                type: String
            }
        }
    ],
    education :[
        {
            name:{
                type:String,
                default:''
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
        ins:{
            type: String,
            default: ''
        }
    }],
    experience :[
        {
            company_name :{
                type:String,
                default:''
            },
            starting_year :{
                type:String
            },
            ending_year :{
                type:String
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
    communities :[
        {
            community_id:{
                type:String,
                default:0
            },
            joining_dt:{
                type:Date,
            }
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
    comments :[String],
    followers :[String],
    following :[{
        isCommunity : {
            type : Boolean
        },
        id : {
            type : String
        }
    }]
});

mongoose.model('User',userSchema);