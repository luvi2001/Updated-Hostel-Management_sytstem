const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const authmiddleware = async (req, res, next) => {
  try {
    let token;

    // Check for token in HttpOnly cookie FIRST (more secure)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Fallback to Authorization header (for flexibility)
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user based on decoded token data
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user data to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authmiddleware;