const express = require('express');
const app = express();
const cors = require('cors');

require("dotenv").config();
require("./config/database").connect()
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const adminRoute = require("./routes/admin")
const productRoute = require("./routes/prodcut")
const addressRoute = require("./routes/address")


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//Router
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/root', adminRoute);
app.use('/api', addressRoute);

const port = 3000;  ;

// Define your routes and middleware here using app

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});