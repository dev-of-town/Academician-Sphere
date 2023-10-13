const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    category: {
        type: String,
        required : [true,'Category cannot be null.']
    },
    isPublic: {
        type: Boolean,
        required: [true, 'Choose the post visibility.']
    },
    community: [String],
    sender_id: {
        type: String,
        required: [true, 'Sender ID cannot be empty.']
    },
    date: {
        type: Date
    },
    title: {
        type: String
    },
    body: {
        type: String,
        required: [true, 'Post Body cannot be empty.']
    },
    attachment: {
        type: String
    },
    votes: {
        type: Number
    },
    upvotes: [{
        user_id: {
            type: String
        },
        dt: {
            type: Date
        }
    }],
    downvotes: [{
        user_id: {
            type: String
        },
        dt: {
            type: Date
        }
    }],
    comments: [String]
});

module.exports = mongoose.model('Posts',postSchema);