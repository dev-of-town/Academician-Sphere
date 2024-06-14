const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('mongoose').model('User');

// LOGIN
router.post("/login", async (req, res) => {
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

// SIGNUP
router.post("/signup", async (req, res) => {
    console.log("In sign-up")
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
        // req.session.user_id = user._id;
        return res.json({ success: true, status: 200, user: user });
    } catch (error) {
        console.error("Unable to create the user profile: ", error.message);
        return res.json({ success: false, status: 500 });
    }
});

module.exports = router;