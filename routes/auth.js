const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { verifyToken } = require("../middleware/auth");

// --------------register--------------------
router.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, phone_number, gender, dob, } = req.body ;

    const userPassword = req.body.password;

    console.log(first_name);
    // Validate user input
    if (!(email && userPassword && first_name && last_name)) {
      return res.status(400).json({
        success: 0,
        status: 400,
        message: "All input is required",
      });
    }

    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({
        success: 0,
        status: 409,
        message: "User Already Exist. Please Login",
      });
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(userPassword, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      dob,
      gender,
      phone_number,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    //create token
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    //save user token
    user.token = token;

    //return new user
    const { password, ...others } = user._doc;

    res.status(201).json({
      success: 1,
      status: 201,
      message: "User created successfully",
      data: others,
    });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    res.status(500).json(err);
  }
});

// ---------------login----------------------
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const userPassword = req.body.password;

    //validate user input
    if (!(email && userPassword)) {
      return res.status(400).json({
        success: 0,
        status: 400,
        message: "All input is required",
      });
    }

    //validate if user exists in our database

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(userPassword, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      //save user token
      user.token = token;

      //user
      const { password, ...others } = user._doc;
      res.status(200).json({
        success: 1,
        status: 200,
        message: "Login successful",
        data: others,
      });
    } else {
      res.status(400).json({
        success: 0,
        status: 400,
        message: "invalid creadentials",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
