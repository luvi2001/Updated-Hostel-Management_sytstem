const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); // Import your User model

const authmiddleware = async (req, res, next) => {
  try {
    // Extract JWT token from request headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the Authorization header

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user based on decoded token data
    const user = await User.findById(decoded.id);

    // Attach user data to request object
    req.user = user;

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authmiddleware;
