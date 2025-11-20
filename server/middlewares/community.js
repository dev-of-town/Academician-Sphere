const Community = require('../models/community');
const mongoose = require('mongoose');
const ExpressError = require('../utils/ExpressError');

const isFollowing = async(req,res,next) =>{
    if(!req.body.json){
        return next(new ExpressError(400,'Undefined is not a valid json'));
    }
    const user_id = JSON.parse(req.body.json).user_id;
    const followedCommunity = await Community.findOne({community_id : req.params.community_id});

    for(let follower of followedCommunity.followers){
        if(follower.user_id == user_id){
            return next(new ExpressError(400,`You are already following ${followedCommunity.name}`));
        }
    }
    next();
}

const isUnfollowing = async(req,res,next) =>{
    if(!req.body.json){
        return next(new ExpressError(400,'Undefined is not a valid json'));
    }
    const user_id = JSON.parse(req.body.json).user_id;
    const unfollowedCommunity = await Community.findOne({community_id : req.params.community_id});

    for(let follower of unfollowedCommunity.followers){
        if(follower.user_id == user_id){
            return next();
        }
    }
    next(new ExpressError(400,`You are already unfollowing ${unfollowedCommunity.name}`));

}

module.exports.isFollowing = isFollowing;
module.exports.isUnfollowing = isUnfollowing;
