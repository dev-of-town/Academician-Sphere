const router = require('express').Router();
const multer = require('multer');
const { userStorage } = require('../config/cloudinary');
const uploadUserData = multer({ storage: userStorage });

const User = require('../models/user');
const Community = require('../models/community');
const Post = require('../models/post');

// CREATE NEW COMMUNITY
async function createCommunity(
    newCommunity,
    community_group,
    user_id,
    parent_community,
    images,
    top
) {
    console.log("This is Our TOp", top);
    try {
        const community = new Community({
            name: newCommunity.name,
            description: newCommunity.description,
            moderators: newCommunity.moderators,
            sub_communities: newCommunity.sub_communities,
            createdBy: user_id,
            community_group: community_group,
            allowed_participants: newCommunity.allowed_participants,
            parent_community: parent_community ? parent_community : null,
            profile_img: {
                filename: images.profile_img
                    ? images.profile_img[0].filename
                    : "defaults/default-community.png",
                url: images.profile_img
                    ? images.profile_img[0].path
                    : "https://res.cloudinary.com/dbrt4m9x8/image/upload/v1697869577/defaults/default-community.png",
            },
            template_img: {
                filename: images.template_img
                    ? images.template_img[0].filename
                    : "defaults/default-background.jpg",
                url: images.template_img
                    ? images.template_img[0].path
                    : "https://res.cloudinary.com/dbrt4m9x8/image/upload/v1697869577/defaults/default-background.jpg",
            },
        });
        await community.save();

        console.log("------------------xxx------------------", newCommunity.name);
        newCommunity.moderators.forEach(async (moderator) => {
            const user = await User.findOne({ _id: moderator });
            const newFollowing = {
                isCommunity: true,
                id: community._id,
            };
            user.following.push(newFollowing);
            await user.save();
        });

        if (!parent_community) top = await community;
        console.log(community);
        if (community.sub_communities.length !== 0) {
            for (let subCommunity of community.sub_communities) {
                subCommunity.moderators = newCommunity.moderators;
                createCommunity(
                    subCommunity,
                    community_group,
                    user_id,
                    community._id,
                    images,
                    top
                );
            }
        }
        return top;
    } catch (err) {
        console.log("Unable to create all communites");
        console.log(err);
    }
}
router.post(
    "/c/new_community",
    uploadUserData.fields([{ name: "profile_img" }, { name: "template_img" }]),
    async (req, res) => {
        try {
            // console.log(req.session.user_id);
            const communityData = req.body.json;
            // console.log(communityData);
            console.log("Files", req.files.profile_img);
            const data = JSON.parse(communityData);
            const top = null;
            const topCommunity = await createCommunity(
                data,
                data.name,
                data.createdBy,
                null,
                req.files,
                top
            );
            console.log("The Most Top", topCommunity);
            return res.json({ success: true, status: 200, community: topCommunity });
        } catch (error) {
            console.log("Unable to create Community !!", error);
            return res.json({ success: false, message: error.message, status: 500 });
        }
    }
);

// GET COMMUNITY DATA
router.post("/c/:id/get-community-data", async (req, res) => {
    const user_id = req.body.user_id;
    const community_id = req.params.id;
    try {
        const communityData = await Community.findOne({ _id: community_id });
        let communityPosts = await Post.find({
            _id: { $in: communityData.posts },
        });
        const communityModerators = await User.find(
            { _id: { $in: communityData.moderators } },
            { _id: 1, username: 1, profile_img: 1 }
        );

        let posts = [];
        for (let post of communityPosts) {
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
        // console.log("POSTS: .......... ", posts);
        communityPosts = posts;

        let data = {};
        data.communityData = communityData;
        data.communityPosts = communityPosts;
        data.communityModerators = communityModerators;
        data.numberOfFollowers = communityData.followers.length;
        data.numberOfParticipants = communityData.participants.length;
        data.isModerator = communityData.moderators.includes(user_id);
        data.isParticipant = communityData.participants.includes(user_id);
        data.isFollower = communityData.followers.includes(user_id);
        console.log(data);

        return res.json({ status: 200, success: true, data: data });
    } catch (error) {
        console.error("Unable to fetch saved posts: ", error);
        return res.json({ status: 500, success: false, error: error.message });
    }
});

module.exports = router;