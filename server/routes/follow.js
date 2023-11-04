const router = require('express').Router();
const User = require('../models/user');

// FOLLOW COMMUNITY
router.get("/c/:community_id/follow", async (req, res) => {
    const foundCommunity = await Community.findOne({
        _id: req.params.community_id,
    });
    foundCommunity.followers.push({
        user_id: req.session.user_id,
        follow_dt: Date(),
    });
    await foundCommunity.save();
    const user = await User.findOne({ _id: req.session.user_id });
    user.following.push(foundCommunity._id);
    await user.save();
    console.log(foundCommunity);
    console.log(user);
    res.send(`You are following ${foundCommunity.name} community`);
});

// UNFOLLOW COMMUNITY
router.get("/c/:community_id/unfollow", async (req, res) => {
    let followingUser, foundUser, index;
    const foundCommunity = await Community.findOne({
        _id: req.params.community_id,
    });
    for (let user of foundCommunity.followers) {
        if (user.user_id == req.session.params) {
            followingUser = user;
            break;
        }
    }
    if (followingUser) {
        index = foundCommunity.followers.indexOf(followingUser);
        foundCommunity.splice(index, 1);
        await foundCommunity.save();
        foundUser = await User.find({ _id: req.session.user_id });
        index = foundUser.following.indexOf(`${foundCommunity._id}`);
        foundUser.following.splice(index, 1);
        await foundUser.save();
        res.send(`You have unfollowed ${foundCommunity.name}`);
    } else {
        res.send(`You must be following ${foundCommunity.name} to unfollow it.`);
    }
});

// FOLLOW USER
router.get("/u/:user_id/follow", async (req, res) => {
    const currentUser = await User.findOne({ _id: req.session.user_id });
    const followedUser = await User.findOne({ _id: req.params.user_id });
    currentUser.following.push(`${followedUser._id}`);
    await currentUser.save();
    followedUser.followers.push(`${currentUser._id}`);
    await followedUser.save();
    res.send(`You are following ${followedUser._username}.`);
});

// UNFOLLOW USER
router.get("/u/:user_id/unfollow", async (req, res) => {
    let index;
    const unfollowedUser = await User.findOne({ _id: req.params.user_id });
    const currentUser = await User.findOne({ _id: req.session.user_id });
    const isFollowing = currentUser.following.includes(`${req.params.username}`);
    if (isFollowing) {
        index = currentUser.following.indexOf(`${req.params.username}`);
        currentUser.followers.splice(index, 1);
        await currentUser.save();
        index = unfollowedUser.followers.indexOf(`${currentUser._id}`);
        unfollowedUser.followers.splice(index, 1);
        await unfollowedUser.save();
        res.send(`You have unfollowed ${unfollowedUser.username}.`);
    } else {
        res.send(
            `You must be following ${unfollowedUser.username} to unfollow him/her.`
        );
    }
});

module.exports = router;