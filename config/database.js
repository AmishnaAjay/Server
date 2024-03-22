const mongoose = require('mongoose');

// const {MONGO_URI} = process.env
const username = encodeURIComponent("amishnaca1995");
const password = encodeURIComponent("Amishna@123");

const MONGO_URI=  `mongodb+srv://${username}:${password}@server.xsuxeag.mongodb.net/?retryWrites=true&w=majority&appName=server`


exports.connect = () => {
    mongoose
    .connect(MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((err) => {
        console.log("database connection failed. exiting now...");
      console.error(err);
      process.exit(1);
    })
}