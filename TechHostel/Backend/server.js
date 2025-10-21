require('dotenv').config();
const xssSanitize = require('./middleware/sanitize');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const app = express();
const cookieParser = require('cookie-parser'); 
const wardenRoutes = require('./routes/warden');
const securityRoutes = require('./routes/security');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const fstaffRoutes=require('./routes/fstaff')
const studentRoutes=require('./routes/student')
const healthInfoRoutes=require('./routes/healthInfoRoutes')

app.use(cookieParser());
app.use(xssSanitize);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

app.use((req, res, next) => {
  // Anti-clickjacking headers
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', 
  "frame-ancestors 'none'; " +
  "default-src 'self'; " +
  "script-src 'self'; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data:; " +
  "font-src 'self'; " +
  "connect-src 'self'; " +
  "object-src 'none'; " +
  "base-uri 'self'"
);
  
  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
})

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

app.get('/gf', (req, res) => {
  res.send("Welcome to project Tech?Hostel");
});


app.use('/api/warden', wardenRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/fstaff', fstaffRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/healthInfoRoutes',healthInfoRoutes)

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
