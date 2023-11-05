if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const PORT = 4041;
const app = express();

require('./config/database');
require('./models/user');
require('./models/post');
require('./models/community');
require('./models/comment');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(require('./routes'));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port.`);
});