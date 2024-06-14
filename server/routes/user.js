const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { cloudinary } = require('../config/cloudinary');
const { userStorage } = require('../config/cloudinary');
const uploadUserData = multer({ storage: userStorage });

const User = mongoose.model('User');
const Community = mongoose.model('Community');
const Post = mongoose.model('Post');

// GET USER DATA
router.post("/u/:profile_id", async (req, res) => {
    const id = req.params.profile_id;
    const user_id = req.body.user_id;
    try {
        const userData = await User.findOne({ _id: id });
        if (userData) {
            delete userData.password;
            const isSelfAccount = id === user_id;
            console.log(userData);
            const user = { ...userData._doc, flag: isSelfAccount ? 1 : 0 };
            console.log(user);
            return res.json({ status: 200, success: true, user: user });
        } else {
            console.log(`Unable to find profile with ID: ${id}`);
            return res.json({ success: false, status: 400, message: "not found" });
        }
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        return res.json({ success: false });
    }
});

// UPDATE USER DATA
router.patch(
    "/edit-profile",
    uploadUserData.fields([{ name: "profile_img" }, { name: "background_img" }]),
    async (req, res) => {
        // const user_id = req.session.user_id;
        // console.log("User ID: ", user_id);
        let data = req.body.json;
        data = JSON.parse(data);
        const { _id: user_id } = data;
        console.log("Data: ", data);
        const images = req.files;
        console.log("Image: ", images, "Tihs is profile", images.profile_img);
        // console.log(data.profile_img);

        try {
            const userData = await User.findOne({ _id: user_id });
            console.log(userData);
            if (data.changeProfile) {
                console.log(12345);
                await cloudinary.uploader.destroy(userData.profile_img.filename);
                userData.profile_img = {
                    filename: images.profile_img[0].filename,
                    url: images.profile_img[0].path,
                };
            }
            if (data.changeBackground) {
                console.log(54321);
                await cloudinary.uploader.destroy(userData.background_img.filename);
                userData.background_img = {
                    filename: images.background_img[0].filename,
                    url: images.background_img[0].path,
                };
            }

            userData.username = data.username;
            userData.bio = data.bio;
            userData.links = data.links;
            userData.education = data.education;
            userData.skills = data.skills;
            userData.experience = data.experience;
            console.log(
                "-----------------------------------------------------------------------",
                userData
            );
            userData.save();

            return res.json({ status: 200, success: true, user: userData });
        } catch (error) {
            console.error("Unable to update the user data: ", error);
            return res.json({ status: 500, success: false });
        }
    }
);

// GET ALL THE COMMUNITIES FOLLOWED BY THE USER
router.get("/u/:user_id/get-following-community", async (req, res) => {
    //   const user_id = JSON.parse(req.body.json).user_id;
    try {
        const user_id = req.params.user_id;
        const userData = await User.findOne({ _id: user_id });
        const followingCommunity = userData.following.filter((following) => {
            return following.isCommunity;
        });
        console.log(followingCommunity);
        let community_ids = [];
        for (let community of followingCommunity) {
            community_ids.push(community.id);
        }
        let result = [];
        await Community.find(
            { community_id: { $in: community_ids } },
            { community_id: 1, name: 1, profile_img: 1 }
        ).then((data) => {
            result = data;
        });
        return res.json({ status: 200, success: true, followingCommunity: result });
    } catch (error) {
        console.error("Unable to fetch communities followed by user: ", error);
        return res.json({
            status: 500,
            success: false,
            message: "Unable to fetch communites followed by user",
        });
    }
});

// GET ALL THE POSTS CREATED BY THE USER
router.get("/u/:user_id/get-user-posts", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const userData = await User.findOne({ _id: user_id });
        // console.log("Post IDs:", userData.posts);
        let data = [];
        for (let post_id of userData.posts) {
            const postData = await Post.findOne({ _id: post_id });
            // console.log("POSTS: .......... ", posts);
            data.push({
                ...postData._doc,
                sender_name: userData.username,
                sender_profile: userData.profile_img,
            });
        }
        return res.json({ status: 200, success: true, posts: data });
    } catch (error) {
        console.error("Unable to fetch the posts: ", error);
        return res.json({ status: 500, success: false, error: error.message });
    }
});

// GET SAVED POSTS OF THE USER
router.get("/u/:user_id/get-saved-posts", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const userData = await User.findOne({ _id: user_id });
        console.log("Saved IDs:", userData.saved_posts);
        let data = [];
        for (let post of userData.saved_posts) {
            const postData = await Post.findOne({ _id: post.post_id });
            data.push({
                ...postData._doc,
                sender_name: userData.username,
                sender_profile: userData.profile_img,
            });
        }
        return res.json({ status: 200, success: true, savedPosts: data });
    } catch (error) {
        console.error("Unable to fetch saved posts: ", error);
        return res.json({ status: 500, success: false, error: error.message });
    }
});

// FOLLOW USER
router.post("/u/:user_id/follow", async (req, res) => {
    const user_id = JSON.parse(req.body.json).user_id;
    const currentUser = await User.findOne({ _id: user_id });
    const followedUser = await User.findOne({ _id: req.params.user_id });
    currentUser.following.push(`${followedUser._id}`);
    await currentUser.save();
    followedUser.followers.push(`${currentUser._id}`);
    await followedUser.save();
    res.send(`You are following ${followedUser._username}.`);
});

// UNFOLLOW USER
router.post("/u/:user_id/unfollow", async (req, res) => {
    const user_id = JSON.parse(req.body.json).user_id;
    let index;
    const unfollowedUser = await User.findOne({ _id: req.params.user_id });
    const currentUser = await User.findOne({ _id: user_id });
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
