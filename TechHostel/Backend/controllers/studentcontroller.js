
const studentmodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginmodel = require("../models/loginmodel");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);




const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await studentmodel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // check if user status is suspended
    if (user.status === "suspended") {
      return res.status(403).json({
        success: false,
        message: "Your account has been suspended. Please contact support",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, },
      process.env.JWT_SECRET,
      {
        // expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};


const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    const student = await studentmodel.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "You are not registered by the warden" });
    }

    // ✅ create session
    req.session.userId = student._id;

    res.json({ message: "Student login success", student });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google login failed" });
  }
};

// Fetch profile via session
const getProfile = async (req, res) => {
  try {
    const student = await studentmodel.findById(req.session.userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ user: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};




  const createstudentLogin = async (req, res) => {
      try {
          const { email } = req.body;
  
         const role="student";
          // Create a new login profile with hashed password
          const newProfile = new loginmodel({
              email,
              role,
          });
  
          // Save the new profile
          await newProfile.save();
  
          res.status(201).json({ message: 'Login profile created', data: newProfile });
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
      }
  };

  module.exports={createstudentLogin,Login,getProfile,googleLogin}