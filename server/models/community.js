const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Community name cannot be empty.']
    },
    profile_img: {
        type: String,
        default :'https://www.doyonutilities.com/wp-content/uploads/profile-icon.png'
    },
    template_img: {
        type: String,
        default :'https://www.doyonutilities.com/wp-content/uploads/profile-icon.png'
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
    sub_communities: [String],
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

module.exports = mongoose.model('Communities',communitySchema);