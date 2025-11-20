const ExpressError = require('../utils/ExpressError');
const mongoose = require('mongoose');
const User = require('../models/user');

isFollowing = async(req,res,next) =>{
    if(!req.body.json){
        return next(new ExpressError(400,'Undefined is not a valid json'));
    }
    const user_id = JSON.parse(req.body.json).user_id;
    const currentUser = await User.findOne({_id : user_id});
    const followedUser = await User.findOne({_id : req.params.user_id});

    if(followedUser.followers.includes(user_id)){
        return next(new ExpressError(400,`You are already following ${followedUser.username}`));
    }
    next();
}

isUnfollowing = async(req,res,next) =>{
    if(!req.body.json){
        return next(new ExpressError(400,'Undefined is not a valid json'));
    }
    const user_id = JSON.parse(req.body.json).user_id;
    const currentUser = await User.findOne({_id : user_id});
    const unfollowedUser = await User.findOne({_id : req.params.user_id});

    if(!unfollowedUser.followers.includes(user_id)){
        return next(new ExpressError(400,`You are already unfollowing ${unfollowedUser.username}`))
    }
    next();
}

module.exports.isFollowing = isFollowing;
module.exports.isUnfollowing = isUnfollowing;