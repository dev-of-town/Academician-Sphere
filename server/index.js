if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const PORT = 4041;
const postRoutes = require('./routes/post');
const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/user');
const communityRoutes = require('./routes/community');
const authenticationRoutes = require('./routes/authentication');
const followRoutes = require('./routes/follow');
require('./config/database');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 15 },
  resave: false,
  rolling: true,
})
);
app.use(cors({ origin: true, credentials: true }));

app.use(authenticationRoutes);
app.use(userRoutes);
app.use(communityRoutes);
app.use(searchRoutes);
app.use(postRoutes);
app.use(followRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port.`);
});