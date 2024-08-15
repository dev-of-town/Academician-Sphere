const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Community = mongoose.model('Community');

// SEARCH COMMUNITY
router.get("/c/search", async (req, res) => {
    //console.log("Community search !!");
    const { q } = req.query;
    let foundCommunity = [];
    try {
        foundCommunity = await Community.find({
            parent_community:null,
            name: { $regex: `^${q}`, $options: "mi" },
        }).project({ community_id: 1, name: 1, profile_img: 1 });
        return res.json({ success: true, status: 200, data: foundCommunity });
    } catch (err) {
        //console.log(err);
        return res.json({
            success: false,
            status: 500,
            message: "Cannot carry search, try again later !!",
        });
    }
});

// SEARCH USER
router.get("/u/search", async (req, res) => {
    const { q } = req.query;
    try {
        const foundUser = await User.find(
            {
                username: { $regex: `^${q}`, $options: "mi" },
            },
            { community_id: 1, username: 1, profile_img: 1 }
        );
        return res.json({ success: true, status: 200, data: foundUser });
    } catch (error) {
        //console.log(err);
        return res.json({
            success: false,
            status: 500,
            message: "Cannot carry search, try again later !!",
        });
    }
});

// SEARCH BOTH
router.get("/search", async (req, res) => {
    const { q } = req.query;
    let result = {};
    try {
        const foundCommunity = await Community.find(
            {   parent_community:null,
                name: { $regex: `^${q}`, $options: "mi" },
            },
            { community_id: 1, name: 1, profile_img: 1 }
        );
        const foundUser = await User.find(
            {
                username: { $regex: `^${q}`, $options: "mi" },
            },
            { _id: 1, username: 1, profile_img: 1 }
        );

        result.communities = foundCommunity;
        result.users = foundUser;

        return res.json({ success: true, status: 200, data: result });
    } catch (err) {
        //console.log(err);
        return res.json({
            success: false,
            status: 500,
            message: "Cannot carry search, try again later !!",
        });
    }
});

module.exports = router;
