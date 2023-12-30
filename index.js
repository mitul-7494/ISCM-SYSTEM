const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const router = require("./controll/router");
const cookieParser = require("cookie-parser");
require('dotenv').config();


const express = require('express');
const server = express();

main().catch(err => console.log(err));
async function main(){
    
  mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error);
    });
}

server.use(cookieParser());
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(express.urlencoded({extended: true}));
server.use('/static', express.static('public'))
server.use("/", router);
server.set("view engine", "ejs");

server.listen(8081, ()=>{
    console.log("server started");
})

// process.on("unhandledRejection", err => {
//     console.log(`An error occurred: ${err.message}`)
//     server.close(() => process.exit(1))
//   })