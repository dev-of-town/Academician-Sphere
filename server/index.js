if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = 4041;

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const { postStorage } = require("./cloudinary");
const uploadPostData = multer({ storage: postStorage });
const { userStorage } = require("./cloudinary");
const uploadUserData = multer({ storage: userStorage });
const { cloudinary } = require("./cloudinary");

const User = require("./models/user");
const Community = require("./models/community");
const Comment = require("./models/comment");
const Post = require("./models/post");
const { log } = require("console");

mongoose
  .connect("mongodb://127.0.0.1:27017/project")
  .then(() => {
    console.log("Mongo connection successful !!");
  })
  .catch((err) => {
    console.log("Mongo connection unsuccessful !!");
    console.log(err);
  });

app.use(express.json());
app.use(
  session({
    secret: "mysessionsecret",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 15 },
    resave: false,
    rolling: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Academician-Sphere")));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// HOME-PAGE
app.get("/", (req, res) => {
  if (req.session.user_id) {
    res.sendFile(
      path.join(__dirname, "/Academician-Sphere/src/community-home.html")
    );
  } else {
    res.redirect("/login");
  }
});

// LOG-IN
app.get("/login", (req, res) => {
  try {
    // console.log(req);
    console.log(req.session.user_id, req.cookies, req.cookie);
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  try {
    const user = await User.findOne({ mail: enteredEmail });
    if (!user) {
      return res.json({
        status: 404,
        success: false,
        message: "User does not exists",
      });
    }
    bcrypt.compare(enteredPassword, user.password, (error, result) => {
      if (error) {
        console.log(`ERROR: ${error.message}`);
        return res.json({ status: 500, success: true, message: error.message });
      } else if (result) {
        console.log("Logged in as:", user);
        delete user.password;
        return res.json({ status: 200, success: true, user });
      } else {
        console.log("Passwords donot match.");
        res.json({
          status: 400,
          success: false,
          message: "Passwords donot match.",
        });
      }
    });
  } catch (error) {
    console.log(`Unable to find the user with email: ${enteredEmail}`, error);
    return res.json({ status: 500, success: false });
  }
});

// SIGN-UP
app.get("/signup", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/Academician-Sphere/src/register/signup.html")
  );
});

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  let isUsername = await User.findOne({ username });
  let isEmail = await User.findOne({ email });
  if (isUsername) {
    return res.json({
      status: 409,
      success: false,
      message: "Username already exist",
    });
  }
  if (isEmail) {
    return res.json({
      status: 410,
      success: false,
      message: "Email already exist",
    });
  }

  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username: username,
    mail: email,
    password: hash,
  });
  try {
    await user.save();
    req.session.user_id = user._id;
    return res.json({ success: true, status: 200, user: user });
  } catch (error) {
    console.error("Unable to create the user profile: ", error.message);
    return res.json({ success: false, status: 500 });
  }
});

// GET USER DATA
app.post("/u/:id", async (req, res) => {
  const id = req.params.id;
  const user_id = req.body.user_id;
  try {
    const userData = await User.findOne({ _id: id });
    if (userData) {
      delete userData.password;
      const isSelfAccount = (id === user_id);
      console.log(userData);
      const user = { ...userData._doc, flag: ((isSelfAccount)?1:0) };
      console.log(user);
      return res.json({ status: 200, success: true, user:user});
    } else {
      console.log(`Unable to find profile with ID: ${id}`);
      return res.json({ success: false, status: 400, message: "not found" });
    }
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    return res.json({ success: false });
  }
});

// ---------------------------------------- OLD CODE ------------------------------------------------
// app.get("/u/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const userData = await User.findOne({ _id: id });
//     if (userData) {
//       // res.header('Access-Control-Allow-Origin', "*");
//       delete userData.password;
//     //   console.log(userData);
//       return res.json({ status: 200, success: true, user: userData }); // to be redirected to the profile page .....
//     } else {
//       console.log(`Unable to find profile with ID: ${id}`);
//       return res.json({ success: false, status: 400, message: "not found" });
//     }
//   } catch (error) {
//     console.log(`ERROR: ${error.message}`);
//     // res.redirect("/");
//     return res.json({ success: false });
//   }
// });

// UPDATE USER DATA
app.patch(
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

// GET COMMUNITY DATA
app.get("/c/:community_id", async (req, res) => {
  const community_id = req.params.community_id;
  try {
    const communityData = await Community.findOne({ _id: community_id });
    if (communityData) {
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, application/json"
      );
      res.send(communityData); // to be redirected to the community home page .....
    } else {
      console.log(`Unable to find the community with name: ${community_name}`);
      res.redirect("/");
    }
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
    res.redirect("/");
  }
});

// CREATE NEW COMMUNITY
app.post(
  "/c/new_community",
  uploadUserData.fields([{ name: "profile_img" }, { name: "template_img" }]),
  async (req, res) => {
    try {
      // console.log(req.session.user_id);
      const communityData = req.body.json;
      // console.log(communityData);
      console.log("Files", req.files.profile_img);
      const data = JSON.parse(communityData);

      createCommunity(data, null, data.name, data.createdBy, null, req.files);
      return res.json({ success: true, status: 200 });
    } catch (error) {
      console.log("Unable to create Community !!", error);
      return res.json({ success: false, message: error.message, status: 500 });
    }
  }
);

app.get('/c/search',async (req,res) =>{
    console.log("Community search !!");
    const {q} = req.query;
    let foundCommunity = [];
    try{
    foundCommunity = await Community.find({name : {$regex : `^${q}`,$options : 'mi'}}).project({_id:1,name:1,profile_img:1});
    return res.json({success : true, status : 200, data : foundCommunity});
    }catch(err){
        console.log(err);
        return res.json({success : false, status : 500, message : "Cannot carry search, try again later !!"});
    }
});

app.get('/u/search',async (req,res) =>{
    const {q} = req.query;
    let foundUser =[];
    try{
    foundUser = await User.find({username : {$regex : `^${q}`,$options : 'mi'}}).project({_id:1,username:1,profile_img:1});
    return res.json({success : true, status : 200, data : foundUser});
    }catch(error){
        console.log(err);
        return res.json({success : false, status : 500, message : "Cannot carry search, try again later !!"});
    }
});

app.get('/search',async (req,res) =>{
    const {q} = req.query;
    let result = [];
    try{
    const foundCommunity = await Community.find({name : {$regex : `^${q}`,$options : 'mi'}}).project({_id:1,name:1,profile_img:1});
    const foundUser = await User.find({username : {$regex : `^${q}`,$options : 'mi'}}).project({_id:1,username:1,profile_img:1});
    if(foundCommunity !== 0){
        for(let community of foundCommunity){
            result.push(community);
        }
    }
    if(foundUser.length !== 0){
        for(let user of foundUser){
            result.push(user);
        }
    }
    return res.json({success : true, status : 200, data : result});
    }catch(err){
        console.log(err);
        return res.json({success : false, status : 500, message : "Cannot carry search, try again later !!"});
    }
    
});

app.post("/u/:id/get-following-community", async (req, res) => {
  // const user_id = JSON.parse(req.body.json).user_id;
  const user_id = req.params.id;
  try {
    const userData = await User.findOne({ _id: user_id });
    const followingCommunity = userData.filter((following) => {
      return following.isCommunity;
    });
    console.log(followingCommunity);
    let community_ids = [];
    for (let community of followingCommunity) {
      community_ids.push(community.id);
    }
    let result = [];
    await Community.find({ _id: { $in: community_ids } })
      .project({ _id: 1, name: 1, profile_img: 1 })
      .then((data) => {
        result = data;
      });
    return res.json({ status: 200, success: true, followingCommunity: result });
  } catch (err) {
    console.error("Unable to fetch communities followed by user: ", err);
    return res.json({
      status: 500,
      success: false,
      message: "Unable to fetch communites followed by user",
    });
  }
});

app.get("/c/:community_id/follow", async (req, res) => {
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

app.get("/c/:community_id/unfollow", async (req, res) => {
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

app.get("/u/:user_id/unfollow", async (req, res) => {
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

app.get("/u/:user_id/follow", async (req, res) => {
  const currentUser = await User.findOne({ _id: req.session.user_id });
  const followedUser = await User.findOne({ _id: req.params.user_id });
  currentUser.following.push(`${followedUser._id}`);
  await currentUser.save();
  followedUser.followers.push(`${currentUser._id}`);
  await followedUser.save();
  res.send(`You are following ${followedUser._username}.`);
});

// CREATE NEW POST
app.get("/c/new_post", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Academician-Sphere/src/create_post/create_post.html")
  );
});

app.post(
  "/new-post",
  uploadPostData.array("attachement", 10),
  async (req, res) => {
    try {
      let postData = req.body.json;
      let data = JSON.parse(postData);
      // postData.sender_id = req.session.user_id;
      const attachements = req.files;
      console.log("Post: ", data);
      console.log("Images: ", req.files);

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

// GET COMMUNITY ACCORDING TO CATEGORY[i.e. EVENT, EDUCATION, ...]
app.get("/c/:community_id/:filter", async (req, res) => {
  const { community_id, filter } = req.params;
  let filteredPosts = [];
  try {
    const communityData = await Community.findOne({ _id: community_id });
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

// UPVOTE-DOWNVOTE
app.post("/upvote/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  const user_id = JSON.parse(req.body).user_id;

  try {
      const postData = await Post.findOne({ _id: post_id });

      let i = postData.upvotes.findIndex((upvote) => (upvote.user_id == user_id));
      if(i > -1) postData.upvotes[i].dt = new Date();
      else {
          const newUpvote = {
              user_id: user_id,
              dt: new Date()
          };
          postData.upvotes.push(newUpvote);
      }

      i = postData.downvotes.findIndex((downvote) => (downvote.user_id == user_id));
      if(i > -1) postData.downvotes = postData.downvotes.splice(i + 1, 1);
      postData.votes = postData.upvotes.length - postData.downvotes.length;
      postData.save();

      return res.json({ success: true });
  } catch(error) {
      console.error("Unable to Upvote the post.", error.message);
      return res.json({ success: false });
  }
});

app.post("/downvote/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  const user_id = JSON.parse(req.body).user_id;

  try {
      const postData = await Post.findOne({ _id: post_id });

      let i = postData.downvotes.findIndex((downvote) => (downvote.user_id == user_id));
      if(i > -1) postData.downvotes[i].dt = new Date();
      else {
          const newDownvote = {
              user_id: user_id,
              dt: new Date()
          };
          postData.downvotes.push(newDownvote);
      }
      
      i = postData.upvotes.findIndex((upvote) => (upvote.user_id == user_id));
      if(i > -1) postData.upvotes = postData.upvotes.splice(i + 1, 1);
      postData.votes = postData.upvotes.length - postData.downvotes.length;
      postData.save();

      return res.json({ success: true });
  } catch(error) {
      console.error("Unable to Downvote the post.", error.message);
      return res.json({ success: false });
  }
});


// SAVE-UNSAVE
app.post("/save/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  const user_id = JSON.parse(req.body).user_id;
  
  try {
      const userData = await User.findOne({ _id: user_id });

      let i = userData.saved_posts.findIndex((saved_post) => (saved_post.post_id == post_id));
      if(i > -1) userData.saved_posts[i].dt = new Date();
      else {
          const newSave = {
              post_id: post_id,
              dt: new Date()
          };
          userData.saved_posts.push(newSave);
      }
      userData.save();

      return res.json({ success: true });
  } catch(error) {
      console.error("Unable to Save post: ", error);
      return res.json({ success: false });
  }
});

app.post("/unsave/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  const user_id = JSON.parse(req.body).user_id;

  try {
      const userData = await User.findOne({ _id: user_id });
      console.log(userData);

      let i = userData.saved_posts.findIndex((saved_post) => (saved_post.post_id == post_id));
      if(i > -1) userData.saved_posts = userData.saved_posts.splice(i + 1, 1);
      userData.save();

      return res.json({ success: true });
  } catch(error) {
      console.error("Unable to Unsave post: ", error);
      return res.json({ success: false });
  }
});

// DELETE POST
app.delete("/delete-post/:community_id/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  const community_id = req.params.community_id;
  const user_id = JSON.parse(req.body).user_id;
  console.log("User:", user_id);
  console.log("Community:", community_id);
  console.log("Post:", post_id);

  const removalFunction = async (postData, communityData) => {
      try {
          if(communityData == null) communityData = await Community.findOne({ _id: community_id });

          // remove post from the posts array in the Community
          let i = communityData.posts.findIndex((post) => (post == post_id));
          if(i > -1) communityData.posts = communityData.posts.splice(i + 1, 1);
          communityData.save();
          
          // remove the community from Community array in the Post
          i = postData.community.findIndex((community) => (community == community_id));
          if(i > -1) postData.community = postData.community.splice(i + 1, 1);
          postData.save();

          // remove post from posts array in the User if community array is empty in the Post
          // remove the post if community array is empty in the Post
          if(!postData.community) {
              const userData = await User({ _id: postData.sender_id });
              i = userData.posts.findIndex((post) => (post == post_id));
              if(i > -1) userData.posts = userData.posts.splice(i + 1, 1);
              userData.save();
              for(let attachment of postData.attachment) await cloudinary.uploader.destroy(attachment.filename);
              await Post.deleteOne({ _id: post_id });
          }

          res.send(JSON.stringify({ success: true }));
      } catch(error) {
          console.error("Unable to Delete the post: ", error.message);
          res.send(JSON.stringify({ success: false }));
      }
  };

  try {
      const postData = await Post.findOne({ _id: post_id });
      console.log("Checking for sender of the post.");
      if(postData.sender_id == user_id) {
        removalFunction(postData, null);
      }
      else {
        console.log("User is not sender of the post.");
        console.log("Checking for moderator of the post.");
          try {
              const communityData = await Community.findOne({ _id: community_id });
              let flag = false;
              for(let moderator in communityData.moderators) {
                  if(moderator == user_id) {
                      flag = true;
                      break;
                  }
              }
              if(flag) removalFunction(postData, communityData);
              else console.log("User is not moderator of the post.");
          } catch(error) {
              console.error("Unable to find the community: ", error.message);
              res.send(JSON.stringify({ success: false }));
          }
      }
  } catch(error) {
      console.error("Unable to Fetch the post: ", error.message);
      res.send(JSON.stringify({ success: false }));
  }
});

// GET ALL POSTS OF A USER
app.post("/u/:id/get-user-posts", async (req, res) => {
  const user_id = req.params.id;
  try {
      const userData = await User.findOne({ _id: user_id });
      console.log("Post IDs:", userData.posts);
      let data = [];
      for(let post_id of userData.posts) {
          const postData = await Post.findOne({ _id: post_id });
          data.push(postData);
      }
      return res.json({ status: 200, success: true, posts: data });
  } catch(error) {
      console.error("Unable to fetch the posts: ", error);
      return res.json({ status: 500, success: false, error: error.message });
  }
});


// GET SAVED POSTS OF A USER
app.get("/u/:id/get-saved-posts", async (req, res) => {
  const user_id = req.params.id;
  try {
      const userData = await User.findOne({ _id: user_id });
      console.log("Saved IDs:", userData.saved_posts);
      let data = [];
      for(let post of userData.saved_posts) {
          const postData = await Post.findOne({ _id: post.post_id });
          data.push(postData);
      }
      return res.json({ status: 200, success: true, savedPosts: data });
  } catch(error) {
      console.error("Unable to fetch saved posts: ", error);
      return res.json({ status: 500, success: false, error: error.message });
  }
});


// GET COMMUNITY DATA
app.post("/c/:id/get-community-data", async (req, res) => {
  const user_id = JSON.parse(req.body).user_id;
  const community_id = req.params.id;
  try {
      const communityData = await Community.findOne({ _id: community_id });
      const communityPosts = await Post.find({ _id: { $in: communityData.posts } });

      let data = {};
      data.communityData = communityData;
      data.communityPosts = communityPosts;
      data.isModerator = communityData.moderators.includes(user_id);
      data.isParticipant = communityData.participants.includes(user_id);
      data.isFollower = communityData.followers.includes(user_id);
      data.numberOfFollowers = communityData.followers.length;
      data.numberOfParticipants = communityData.participants.length;
      console.log(data);

      return res.json({ status: 200, success: true, data: data });
  } catch(error) {
      console.error("Unable to fetch saved posts: ", error);
      return res.json({ status: 500, success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port`);
});

async function createCommunity(
  newCommunity,
  mods,
  community_group,
  user_id,
  parent_community,
  images
) {
  try {
    const community = new Community({
      name: newCommunity.name,
      description: newCommunity.description,
      moderators: mods ? mods : [],
      sub_communities: newCommunity.sub_communities,
      createdBy: user_id,
      community_group: community_group,
      allowed_participants: newCommunity.allowed_participants,
      parent_community: parent_community ? parent_community : null,
      profile_img: {
        filename: images.profile_img?images.profile_img[0].filename:null,
        url: images.profile_img?images.profile_img[0].path:null,
      },
      template_img: {
        filename: images.template_img?images.template_img[0].filename:null,
        url: images.template_img?images.template_img[0].path:null,
      },
    });

    await community.save();
    console.log(community);
    if (community.sub_communities.length !== 0) {
      for (let subCommunity of community.sub_communities) {
        createCommunity(
          subCommunity,
          mods,
          community_group,
          user_id,
          community._id,
          images
        );
      }
    }
  } catch (err) {
    console.log("Unable to create all communites");
    console.log(err);
  }
}
