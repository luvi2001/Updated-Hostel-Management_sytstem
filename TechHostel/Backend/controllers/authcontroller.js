
const Login=require('../models/loginmodel')
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
            res.status(200).json({ message: 'Warden login' });
            // Don't send any more responses after redirecting
        } else if(user.role=== 'security'){
            // Redirect to security panel route
            res.status(200).json({ message: 'Security login' });
            // res.redirect('/security-panel');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  
  
  
  
  
  
  
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
          res.status(500).json({ message: 'Internal server error' });
      }
  };

  module.exports={createLogin,loginValidate}