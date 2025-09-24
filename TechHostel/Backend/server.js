require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // Security headers
const hpp = require('hpp');       // Prevent HTTP Parameter Pollution
const rateLimit = require('express-rate-limit'); // Rate limiting
const xssClean = require('xss-clean'); // Prevent XSS attacks
const mongoSanitize = require('express-mongo-sanitize'); // Prevent Mongo injection

const app = express();
// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, try again later'
});

// Import routes
const wardenRoutes = require('./routes/warden');
const securityRoutes = require('./routes/security');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const fstaffRoutes = require('./routes/fstaff');
const studentRoutes = require('./routes/student');
const healthInfoRoutes = require('./routes/healthInfoRoutes');

// ---------------- Security Middlewares ----------------

// Set various HTTP headers for security
app.use(helmet());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// 🔹 Session middleware (for student logins only)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      secure: false, // change to true if using https
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);

// Prevent XSS attacks
app.use(xssClean());


// Sanitize user input to prevent MongoDB Operator Injection
app.use(mongoSanitize());

// Content Security Policy (CSP) — block inline scripts/styles
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],       // Only allow scripts from self
      "style-src": ["'self'"],        // Only allow styles from self
      "img-src": ["'self'", "data:"], // Allow images from self and base64
      "connect-src": ["'self'"],
      "frame-ancestors": ["'none'"],  // Prevent clickjacking
    },
  })
);

// Rate limiter to prevent DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS — allow only frontend app
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Parse JSON
app.use(express.json());

// ---------------- MongoDB Connection ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Error connecting to database:', err));

// ---------------- Routes ----------------
app.get('/', (req, res) => res.send("Welcome to project Tech?H"));
app.get('/gf', (req, res) => res.send("Welcome to project Tech?Hostel"));

app.use('/api/warden', wardenRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fstaff', fstaffRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/healthInfoRoutes', healthInfoRoutes);

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
