const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: [true, 'post_id cannot be null.']
    },
    user_id: {
        type: String,
        required: [true, 'user_id cannot be null.']
    },
    dt: {
        type: Date
    },
    replies: [String],
    parent_comment: {
        type: String
    },
    body: {
        type: String,
        required: [true, 'Comment body cannot be empty.']
    }
});

mongoose.model('Comment',commentSchema);