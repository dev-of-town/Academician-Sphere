const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose  = require('mongoose');

const User = require('./models/user');
const Community = require('./models/community');
const Comment = require('./models/comment');
const Post = require('./models/post');

mongoose.connect('mongodb://127.0.0.1:27017/project')
.then(() =>{
    console.log('Mongo connection successful !!');
})
.catch((err) =>{
    console.log('Mongo connection unsuccessful !!')
    console.log(err);
});

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'Academician-Sphere')));
app.use(session({secret:'mySecret'}));
//app.use(express.static('Academician-Sphere/src'));


app.get('/',(req,res) =>{
    if(req.session.user_id) {
        // console.log(req.session.user_id);
        res.sendFile(path.join(__dirname,'/Academician-Sphere/src/community-home.html'));
    }
    else{
        res.redirect('/login');
    }
});

app.get('/c/new_post',(req,res)=>{
    res.sendFile(path.join(__dirname,'Academician-Sphere/src/create_post/create_post.html'));
});

app.get('/login',(req,res) =>{
    res.sendFile(path.join(__dirname,'/Academician-Sphere/src/register/login.html'));
})

app.get('/signup',(req,res) =>{
    res.sendFile(path.join(__dirname,'/Academician-Sphere/src/register/signup.html'));
})

app.post("/login", async (req, res) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    try {
        const { _id, password } = await User.findOne({ mail: enteredEmail });
        bcrypt.compare(enteredPassword, password, (error, result) => {
            if(error) {
                console.log(`ERROR: ${error.message}`);
            } else if(result) {
                req.session.user_id = _id;
                res.redirect("/");
            } else {
                console.log("Passwords donot match.");
                res.redirect("/login");
            }
        });
    } catch(error) {
        console.log(`Unable to find the user with email: ${email}`);
    }
});

app.post('/signup', async (req,res) =>{
    // const {prn} = req.body;
    // const {eid} = req.body;
    // const {username, password, email, college} = req.body;
    
    // let user;
    // if(prn){
    //         user = new User({
    //         username : username,
    //         password :hash,
    //         mail : email,
    //         prn : prn,
    //         dob : new Date()
    //     })
    // }
    // else if(eid){
    //         user = new User({
    //         username : username,
    //         password :hash,
    //         mail : email,
    //         eid : eid,
    //         dob : new Date()
    //     })
    // }
    // else{
    //     user = new User({
    //         username : username,
    //         password :hash,
    //         mail : email,
    //         dob : new Date()
    //     })
    // }

    const {username, password, email} = req.body;
    const hash = await bcrypt.hash(password,12);
    const user = new User({
        username: username,
        mail: email,
        password: hash,
    });
    try {
        await user.save();
        req.session.user_id = user._id;
        res.redirect(`/u/${username}`);
    } catch(error) {
        console.log("Unable to create the user profile.");
        res.redirect("/");
    }
});

app.get('/u/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const userData = await User.findOne({ username: username });
        if(userData) {
            // console.log(userData);
            res.send(userData);   // to be redirected to the profile page .....
        } else {
            console.log(`Unable to find profile with username: ${username}`);
            res.redirect("/");
        }
    } catch(error) {
        console.log(`ERROR: ${error.message}`);
        res.redirect("/");
    }
});

app.post("/c/new_community", async (req, res) => {
    const communityData = req.body;
    const community = new Community({
        name: communityData.name,
        description: communityData.description
    });
    try {
        await community.save();
        // res.sendStatus(200);
        res.redirect(`/c/${communityData.name}`);
    } catch(error) {
        console.log("Unable to create the community.");
        res.redirect("/");
    }
});

app.get('/c/:community_name', async (req, res) => {
    const community_name = req.params.community_name;
    try {
        const communityData = await Community.findOne({ name: community_name });
        if(communityData) {
            res.send(communityData);   // to be redirected to the community home page .....
        } else {
            console.log(`Unable to find the community with name: ${community_name}`);
            res.redirect("/");
        }
    } catch(error) {
        console.log(`ERROR: ${error.message}`);
        res.redirect("/");
    }
});

app.post('/c/new_post', async (req,res)=>{
    let postData = req.body;
    // postData.sender_id = req.session.user_id;
    postData.community_id = [];
    const communities = await Community.find({name : postData.community});
    for(let community of communities){
        postData.community_id.push(community._id);
    }
    console.log(req.session.user_id);
    console.log(postData);

    const newPost = new Post({
        category : postData.category,
        isPublic : postData.isPublic,
        community : postData.community_id,
        sender_id : postData.sender_id,
        date : new Date(),
        title : postData.title,
        body : postData.body,
    });
    await newPost.save();

    const user = await User.findOne({ _id: postData.sender_id });
    user.posts.push(newPost._id);
    await user.save();

    for(let id of postData.community_id){
        const foundCommunity = await Community.findOne({ _id: id});
        foundCommunity.posts.push(newPost._id);
        await foundCommunity.save();
    }

    res.redirect(`/c/${postData.community}`);
    // res.sendFile("D:/bhaumik/web\ development/BWP/project/Academician-Sphere/src/community-home.html");
});

app.get("/c/:community_name/:filter", async (req, res) => {
    const {community_name, filter} = req.params;
    let filteredPosts = [];
    try {
        const communityData = await Community.findOne({ name: community_name });
        if(communityData) {
            for(let post_id of communityData.posts) {
                const post = await Post.findOne({ _id: post_id, category: filter });
                if(post) {
                    filteredPosts.push(post);
                }
            }
            res.send(filteredPosts);    // to be redirected to the community home page .....
        } else {
            console.log(`Unable to find the community with name: ${community_name}`);
            res.redirect("/");
        }
    } catch(error) {
        console.log(`ERROR: ${error.message}`);
        res.redirect("/");
    }
});

app.listen(3000,()=>{
    console.log("Listening on 3000 port");
});