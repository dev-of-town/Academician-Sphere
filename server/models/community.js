const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    community_id:{
        type : String,
        required : [true,'Community_id cannot be empty.'],
        unique : true 
    },
    name: {
        type: String,
        required: [true, 'Community name cannot be empty.']
    },
    profile_img :{
        filename: {
            type :String,
            default :'defaults/default-community.png'
        },
        url: {
            type :String,
            default :'https://res.cloudinary.com/dbrt4m9x8/image/upload/v1697869577/defaults/default-community.png'    
        }
    },
    template_img :{
        filename: {
            type :String,
            default :'defaults/default-background.jpg'
        },
        url: {
            type :String,
            default :'https://res.cloudinary.com/dbrt4m9x8/image/upload/v1697869577/defaults/default-background.jpg'    
        }
    },
    description: {
        type: String,
        default: 'No description added yet ...'
    },
    participants: [
        {
            user_id: {
                type: String
            },
            follow_dt: {
                type: Date
            }
        }
    ],
    moderators: [String],
    posts: [String],
    allowed_participants: [String],
    sub_communities: [],
    createdBy : {
        type : String
    },
    community_group :{
        type : String
    },
    parent_community: {
        type: String
    },
    followers: [
        {
            user_id: {
                type: String
            },
            follow_dt: {
                type: Date
            }
        }
        
    ]
});

mongoose.model('Community',communitySchema);
