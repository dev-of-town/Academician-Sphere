if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const PORT = process.env.PORT;
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

app.all('*',(req,res) =>{
  res.status(404).json({success:false,status:404,message:'Resource not found'});
});

app.use((err,req,res,next) =>{
  console.log(err);
  const {status=500,message='Something went wrong!!'} = err;
  res.status(status).json({
    success : false,
    status : status,
    message : message
  })
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} port.`);
});