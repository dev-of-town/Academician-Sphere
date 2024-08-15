const router = require("express").Router();
const multer = require("multer");
const mongoose = require("mongoose");
const { userStorage } = require("../config/cloudinary");
const uploadUserData = multer({ storage: userStorage });

const User = mongoose.model("User");
const Community = mongoose.model("Community");
const Post = mongoose.model("Post");

// CREATE NEW COMMUNITY
async function createCommunity(
  newCommunity,
  community_group,
  user_id,
  parent_community,
  images,
  top,
  communityNameId
) {
  //console.log("This is Our TOp", top);
  // if (!top) {
    newCommunity.community_id = String(communityNameId);
  // } else {
  //   newCommunity.community_id = String(newCommunity.community_id);
  // }
  try {
    const community = new Community({
      community_id: communityNameId,
      name: newCommunity.name,
      description: newCommunity.description,
      moderators: newCommunity.moderators,
      sub_communities: [],
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
    for (let subCommunity of newCommunity.sub_communities) {
      community.sub_communities.push(
        String(communityNameId+"/"+subCommunity.name)
      );
    }
    await community.save();

    //console.log("------------------xxx------------------", newCommunity.name);
    newCommunity.moderators.forEach(async (moderator) => {
      const user = await User.findOne({ _id: moderator });
      const joinedCommunity = {
        community_id: community.community_id,
        joining_dt: new Date(),
      };
      const followingCommunity = {
        isCommunity: true,
        id: community.community_id,
      };
      user.communities.push(joinedCommunity);
      user.following.push(followingCommunity);
      try {
        await user.save();
      } catch (error) {
        console.log("Bhai ", error.message);
      }
    });

    if (!parent_community) top = community;
    console.log(community);
    if (newCommunity.sub_communities.length !== 0) {
      for (let subCommunity of newCommunity.sub_communities) {
        subCommunity.moderators = newCommunity.moderators;
        createCommunity(
          subCommunity,
          community_group,
          user_id,
          community.community_id,
          images,
          top,
          String(communityNameId+"/"+subCommunity.name)
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
      const communityData = req.body.json;
      //console.log("Files", req.files.profile_img);
      const data = JSON.parse(communityData);
      data.moderators.splice(0, 1);
      const top = null;
      isUnique = await Community.findOne({ community_id: data.name });
      console.log(isUnique);
      if (isUnique) {
        return res.json({
          success: false,
          status: 401,
          message: "Top level community name should be unique",
        });
      }
      const topCommunity = await createCommunity(
        data,
        data.name,
        data.createdBy,
        null,
        req.files,
        top,
        data.name
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
router.post("/c/get-community-data/:community_id(*)", async (req, res) => {
  const { username } = req.body;
  const { community_id } = req.params;
  console.log(req.body+"$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log(community_id+"!!!!!!!!!!!!!!!!!!!!$$$$$$$$$$$$$$$$$$$$$$$$");
  try {
    const communityData = await Community.findOne({
      community_id: community_id,
    });
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

    let data = {
      communityData,
      communityPosts,
      communityModerators,
      numberOfFollowers: communityData.followers.length,
      numberOfParticipants: communityData.participants.length,
      isModerator: communityData.moderators.includes(username),
      isParticipant: communityData.followers.find(
        (obj) => obj.user_id === username
      )
        ? true
        : false,
      isFollower: communityData.followers.find(
        (obj) => obj.user_id === username
      )
        ? true
        : false,
    };
    console.log(data);

    return res.json({ status: 200, success: true, data: data });
  } catch (error) {
    console.error("Unable to fetch saved posts: ", error);
    return res.json({ status: 500, success: false, error: error.message });
  }
});

// FOLLOW COMMUNITY
router.post("/c/:community_id/follow", async (req, res) => {
  try {
    const { username } = req.body;
    const { community_id } = req.params;
    console.log(username, req.params);
    const obj = {
      user_id: username,
      follow_dt: Date(),
    };
    const updatedCommunity = await Community.updateOne(
      {
        _id: community_id,
        followers: {
          $not: {
            $elemMatch: {
              user_id: username,
            },
          },
        },
      },
      {
        $push: {
          followers: obj,
        },
      }
    );

    if (updatedCommunity.nModified !== 0) {
      const updateUser = await User.updateOne(
        {
          username: username,
          following: {
            $not: {
              $elemMatch: {
                id: community_id,
              },
            },
          },
        },
        {
          $push: {
            following: {
              isCommunity: true,
              id: community_id,
            },
          },
        }
      );
      // user.following.push(foundCommunity._id);
      // await user.save();
      console.log(updateUser);
      if (updateUser.nModified !== 0) {
        return res.json({
          status: 200,
          success: true,
          message: "followed",
        });
      }
    }

    return res.json({
      status: 403,
      success: false,
      message: "Already followed",
    });
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        status: 500,
        message: "Internal Server Error",
      })
      .status(500);
  }
});

// UNFOLLOW COMMUNITY
router.post("/c/:community_id/unfollow", async (req, res) => {
  try {
    const { username } = req.body;
    const { community_id } = req.params;
    let followingUser, foundUser, index;

    const removeUser = await Community.updateOne(
      {
        _id: community_id,
      },
      {
        $pull: {
          followers: {
            user_id: username,
          },
        },
      }
    );

    if (removeUser.nModified !== 0) {
      const updateFollowing = await User.updateOne(
        { username: username },
        {
          $pull: {
            following: { id: community_id },
          },
        }
      );
      // index = foundUser.following.indexOf(`${community_id}`);
      // foundUser.following.splice(index, 1);
      // await foundUser.save();
      if (updateFollowing.nModified !== 0) {
        return res
          .json({
            status: 200,
            success: true,
            message: `You have unfollowed`,
          })
          .status(200);
      }
      // res.send(`You have unfollowed ${foundCommunity.name}`);
    }
    return res
      .json({
        status: 403,
        success: false,
        message: `You must be following to unfollow it.`,
      })
      .status(403);
  } catch (error) {
    console.log(error);
    return res
      .json({
        success: false,
        status: 500,
        message: "Internal Server Error",
      })
      .status(500);
  }
  // res.send(`You must be following ${foundCommunity.name} to unfollow it.`);
});

module.exports = router;
