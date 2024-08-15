const router = require('express').Router();
const multer = require("multer");
const mongoose = require('mongoose');
const { cloudinary } = require("../config/cloudinary");
const { postStorage } = require("../config/cloudinary");
const uploadPostData = multer({ storage: postStorage });

const User = mongoose.model('User');
const Community = mongoose.model('Community');
const Post = mongoose.model('Post');

// CREATE NEW POST
router.post("/new-post", uploadPostData.array("attachement", 10), async (req, res) => {
    try {
        let postData = req.body.json;
        let data = JSON.parse(postData);
        console.log("This is Post.js Data PPPPPPPPPPPPPPP",data);
        
        // postData.sender_id = req.session.user_id;
        const attachements = req.files;
        // console.log("Post: ", data);
        // console.log("Images: ", req.files);

        let attachement = [];
        if (attachements.length > 0) {
            attachements.forEach((temp) => {
                let obj = {
                    filename: temp.filename,
                    url: temp.path,
                };
                attachement.push(obj);
            });
        }

        const newPost = new Post({
            category: data.category,
            isPublic: data.isPublic,
            community: data.community,
            sender_id: data.sender_id,
            date: new Date(),
            title: data.title,
            body: data.body,
            attachment: attachement,
        });
        await newPost.save();

        const user = await User.findOne({ _id: data.sender_id });
        if (user.posts) user.posts.push(newPost._id);
        await user.save();

        for (let id of data.community) {
            console.log("THi is is is IDDDDDDDD",id);
            
            const foundCommunity = await Community.findOne({ _id: id });
            foundCommunity.posts.push(newPost._id);
            await foundCommunity.save();
        }

        return res.json({ status: 200, success: true, post: newPost });
    } catch (error) {
        console.error("ERROR: ", error);
        return res.json({ status: 500, success: false, error: error.message });
    }
}
);

// DELETE POST
router.delete("/delete-post/:community_id/:post_id", async (req, res) => {
    const post_id = req.params.post_id;
    const community_id = req.params.community_id;
    const user_id = JSON.parse(req.body).user_id;
    console.log("User:", user_id);
    console.log("Community:", community_id);
    console.log("Post:", post_id);

    const removalFunction = async (postData, communityData) => {
        try {
            if (communityData == null)
                communityData = await Community.findOne({ community_id : community_id });

            // remove post from the posts array in the Community
            let i = communityData.posts.findIndex((post) => post == post_id);
            if (i > -1) communityData.posts = communityData.posts.splice(i + 1, 1);
            communityData.save();

            // remove the community from Community array in the Post
            i = postData.community.findIndex(
                (community) => community == community_id
            );
            if (i > -1) postData.community = postData.community.splice(i + 1, 1);
            postData.save();

            // remove post from posts array in the User if community array is empty in the Post
            // remove the post if community array is empty in the Post
            if (!postData.community) {
                const userData = await User({ _id: postData.sender_id });
                i = userData.posts.findIndex((post) => post == post_id);
                if (i > -1) userData.posts = userData.posts.splice(i + 1, 1);
                userData.save();
                for (let attachment of postData.attachment)
                    await cloudinary.uploader.destroy(attachment.filename);
                await Post.deleteOne({ _id: post_id });
            }

            res.send(JSON.stringify({ success: true }));
        } catch (error) {
            console.error("Unable to Delete the post: ", error.message);
            res.send(JSON.stringify({ success: false }));
        }
    };

    try {
        const postData = await Post.findOne({ _id: post_id });
        console.log("Checking for sender of the post.");
        if (postData.sender_id == user_id) {
            removalFunction(postData, null);
        } else {
            console.log("User is not sender of the post.");
            console.log("Checking for moderator of the post.");
            try {
                const communityData = await Community.findOne({ community_id: community_id });
                let flag = false;
                for (let moderator in communityData.moderators) {
                    if (moderator == user_id) {
                        flag = true;
                        break;
                    }
                }
                if (flag) removalFunction(postData, communityData);
                else console.log("User is not moderator of the post.");
            } catch (error) {
                console.error("Unable to find the community: ", error.message);
                res.send(JSON.stringify({ success: false }));
            }
        }
    } catch (error) {
        console.error("Unable to Fetch the post: ", error.message);
        res.send(JSON.stringify({ success: false }));
    }
});

// GET RANDOM POSTS
router.get('/get-random-post', async (req, res) => {
    try {
        postData = await Post.find({ isPublic: true });
        let posts = [];
        for (let post of postData) {
            const senderData = await User.findOne(
                { _id: post.sender_id },
                { username: 1, profile_img: 1 }
            );
            posts.push({
                ...post._doc,
                sender_name: senderData.username,
                sender_profile: senderData.profile_img,
            });
        }
        res.json({ success: true, status: 200, data: posts });
    } catch (err) {
        console.log(err);
        res.json({ success: false, status: 500, message: 'Cannot load post !!' });
    }
});

// GET POSTS ACCORDING TO CATEGORY[i.e. EVENT, EDUCATION, ...]
router.get("/c/:community_id/:filter", async (req, res) => {
    const { community_id, filter } = req.params;
    let filteredPosts = [];
    try {
        const communityData = await Community.findOne({ community_id: community_id });
        if (communityData) {
            for (let post_id of communityData.posts) {
                const post = await Post.findOne({ _id: post_id, category: filter });
                if (post) {
                    filteredPosts.push(post);
                }
            }
            res.send(filteredPosts); // to be redirected to the community home page .....
        } else {
            console.log(`Unable to find the community with ID: ${community_id}`);
            res.redirect("/");
        }
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
        res.redirect("/");
    }
});

// UPVOTE
router.post("/upvote/:post_id", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;

    try {
        const postData = await Post.findOne({ _id: post_id });

        let i = postData.upvotes.findIndex((upvote) => upvote.user_id == user_id);
        if (i > -1) postData.upvotes[i].dt = new Date();
        else {
            const newUpvote = {
                user_id: user_id,
                dt: new Date(),
            };
            postData.upvotes.push(newUpvote);
        }

        i = postData.downvotes.findIndex((downvote) => downvote.user_id == user_id);
        if (i > -1) postData.downvotes = postData.downvotes.splice(i + 1, 1);
        postData.votes = postData.upvotes.length - postData.downvotes.length;
        postData.save();

        return res.json({ success: true });
    } catch (error) {
        console.error("Unable to Upvote the post.", error.message);
        return res.json({ success: false });
    }
});

// DOWNVOTE
router.post("/downvote/:post_id", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.body.user_id;

    try {
        const postData = await Post.findOne({ _id: post_id });

        let i = postData.downvotes.findIndex(
            (downvote) => downvote.user_id == user_id
        );
        if (i > -1) postData.downvotes[i].dt = new Date();
        else {
            const newDownvote = {
                user_id: user_id,
                dt: new Date(),
            };
            postData.downvotes.push(newDownvote);
        }

        i = postData.upvotes.findIndex((upvote) => upvote.user_id == user_id);
        if (i > -1) postData.upvotes = postData.upvotes.splice(i + 1, 1);
        postData.votes = postData.upvotes.length - postData.downvotes.length;
        postData.save();

        return res.json({ success: true });
    } catch (error) {
        console.error("Unable to Downvote the post.", error.message);
        return res.json({ success: false });
    }
});

// SAVE
router.post("/save/:post_id", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = JSON.parse(req.body).user_id;

    try {
        const userData = await User.findOne({ _id: user_id });

        let i = userData.saved_posts.findIndex(
            (saved_post) => saved_post.post_id == post_id
        );
        if (i > -1) userData.saved_posts[i].dt = new Date();
        else {
            const newSave = {
                post_id: post_id,
                dt: new Date(),
            };
            userData.saved_posts.push(newSave);
        }
        userData.save();

        return res.json({ success: true });
    } catch (error) {
        console.error("Unable to Save post: ", error);
        return res.json({ success: false });
    }
});

// UNSAVE
router.post("/unsave/:post_id", async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = JSON.parse(req.body).user_id;

    try {
        const userData = await User.findOne({ _id: user_id });
        console.log(userData);

        let i = userData.saved_posts.findIndex(
            (saved_post) => saved_post.post_id == post_id
        );
        if (i > -1) userData.saved_posts = userData.saved_posts.splice(i + 1, 1);
        userData.save();

        return res.json({ success: true });
    } catch (error) {
        console.error("Unable to Unsave post: ", error);
        return res.json({ success: false });
    }
});

module.exports = router;
