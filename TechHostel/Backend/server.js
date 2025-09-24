require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const rateLimit = require('express-rate-limit');

const app = express();
// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, try again later'
});

const wardenRoutes = require('./routes/warden');
const securityRoutes = require('./routes/security');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const fstaffRoutes = require('./routes/fstaff');
const studentRoutes = require('./routes/student');
const healthInfoRoutes = require('./routes/healthInfoRoutes');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // allow cookies
}));

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

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Error connecting to database:', err));

app.get('/', (req, res) => {
  res.send("Welcome to project Tech?H");
});

app.use('/api/warden', wardenRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fstaff', fstaffRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/healthInfoRoutes', healthInfoRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
