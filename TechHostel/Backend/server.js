require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { csrfProtection, csrfErrorHandler, generateCsrfToken } = require('./middleware/csrfMiddleware');

const app = express();

// Import routes
const wardenRoutes = require('./routes/warden');
const securityRoutes = require('./routes/security');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const fstaffRoutes = require('./routes/fstaff');
const studentRoutes = require('./routes/student');
const healthInfoRoutes = require('./routes/healthInfoRoutes');

// Middleware order is CRITICAL - fix the order:
app.use(express.json());
app.use(cookieParser());

// CORS must come BEFORE CSRF protection
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Security headers middleware
app.use((req, res, next) => {
  // Enhanced CSP header to fix ZAP findings
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';"
  );
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY'); // Anti-clickjacking
  next();
});

// CSRF protection for all routes (this adds req.csrfToken())
app.use(csrfProtection);

// CSRF token endpoint - ONLY ONCE (remove the duplicate)
app.get('/api/csrf-token', generateCsrfToken, (req, res) => {
  res.json({ 
    success: true,
    csrfToken: req.csrfToken() 
  });
});

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Error connecting to database:', err));

// Basic routes
app.get('/', (req, res) => {
  res.send("Welcome to project Tech?H");
});

app.get('/gf', (req, res) => {
  res.send("Welcome to project Tech?Hostel");
});

// API routes
app.use('/api/warden', wardenRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fstaff', fstaffRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/healthInfoRoutes', healthInfoRoutes);

// CSRF error handler - MUST BE AFTER ALL ROUTES
app.use(csrfErrorHandler);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});