const express = require('express');
const { createstudentLogin, Login, getProfile, googleLogin } = require('../controllers/studentcontroller');

const router = express.Router();

// Session middleware for students
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

router.post('/authstudent', createstudentLogin); // keep old
router.post('/google-login', googleLogin); // now sets session
router.post('/log', Login); // keep old JWT login if needed
router.get('/profile', requireAuth, getProfile); // session protected

module.exports = router;
