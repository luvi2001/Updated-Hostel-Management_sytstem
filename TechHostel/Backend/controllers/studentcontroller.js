
const studentmodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



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


const getProfile = async (req, res) => {
    try {
      const user = await studentmodel.findById(req.user.id); // Assuming user is authenticated and user information is available in req.user
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        user
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
  

  




  const createstudentLogin = async (req, res) => {
      try {
          const { email, password } = req.body;
  
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Create a new login profile with hashed password
          const newProfile = new studentmodel({
              email,
              password: hashedPassword, // Save the hashed password
              
          });
  
          // Save the new profile
          await newProfile.save();
  
          res.status(201).json({ message: 'Login profile created', data: newProfile });
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
      }
  };

  module.exports={createstudentLogin,Login,getProfile}