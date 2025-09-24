const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// Configure CSRF protection
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Custom CSRF error handler
const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  
  res.status(403).json({
    success: false,
    message: 'Invalid CSRF token'
  });
};

// Generate CSRF token endpoint
const generateCsrfToken = (req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {
    httpOnly: false, // Let frontend read this cookie
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  
  next();
};

module.exports = {
  csrfProtection,
  csrfErrorHandler,
  generateCsrfToken
};