const Login=require('../models/loginmodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ADD THIS

const loginValidate = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // CREATE JWT TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // SET HTTPONLY COOKIE
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    // Return user info WITHOUT token
    if (user.role === 'warden') {
      res.status(200).json({ 
        message: 'Warden login',
        user: {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } else if(user.role === 'security'){
      res.status(200).json({ 
        message: 'Security login',
        user: {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } else if(user.role === 'paymentstaff'){
      res.status(200).json({ 
        message: 'Paymentstaff login',
        user: {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      });
    } else if(user.role === 'fstaff'){
      res.status(200).json({ 
        message: 'Fstaff login',
        user: {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// ADD LOGOUT FUNCTION
const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Logout failed' });
  }
};

const createLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newProfile = new Login({
      email,
      password: hashedPassword,
      role
    });

    await newProfile.save();

    res.status(201).json({ message: 'Login profile created', data: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// UPDATE EXPORTS
module.exports = { createLogin, loginValidate, logout };