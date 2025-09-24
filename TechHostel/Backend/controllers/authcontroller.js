
const { OAuth2Client } = require("google-auth-library");
const Login = require("../models/loginmodel");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const bcrypt = require('bcrypt');



const loginValidate = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Check if the user exists
        const user = await Login.findOne({ email });
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        // Compare provided password with stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
  
        // Check user role
        if (user.role === 'warden') {
            // Redirect to admin panel route
            res.status(200).json({ message: 'Warden login' ,user});
            //const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
           // res.json({ token });
            // Don't send any more responses after redirecting
        } else if(user.role=== 'security'){
            // Redirect to security panel route
            res.status(200).json({ message: 'Security login',user });
            // res.redirect('/security-panel');
        }else if(user.role=== 'paymentstaff'){
            // Redirect to security panel route
            res.status(200).json({ message: 'Paymentstaff login',user });
            // res.redirect('/security-panel');
        }else if(user.role=== 'fstaff'){
            // Redirect to security panel route
            res.status(200).json({ message: 'Fstaff login',user });
            // res.redirect('/security-panel');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
  
  const googleLoginStudent = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    // Check if student email is registered by warden
    const student = await Login.findOne({ email, role: "student" });

    if (!student) {
      return res.status(403).json({
        message: "Your email is not registered by the warden",
      });
    }

    // Optionally, save Google UID
    if (!student.googleId) {
      student.googleId = sub;
      await student.save();
    }

    // Issue JWT or session (if you’re using tokens)
    // const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Student logged in with Google successfully",
      user: student,
      // token,
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ message: "Invalid Google token" });
  }
};
  
  
  
  
  
  
  const createLogin = async (req, res) => {
      try {
          const { email, password, role } = req.body;
  
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Create a new login profile with hashed password
          const newProfile = new Login({
              email,
              password: hashedPassword, // Save the hashed password
              role
          });
  
          // Save the new profile
          await newProfile.save();
  
          res.status(201).json({ message: 'Login profile created', data: newProfile });
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal server error', error: err.message });
      }
  };

  module.exports={createLogin,loginValidate,googleLoginStudent}