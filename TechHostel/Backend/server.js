require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const app = express();

const wardenRoutes = require('./routes/warden');
const securityRoutes = require('./routes/security');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const fstaffRoutes=require('./routes/fstaff')
const studentRoutes=require('./routes/student')
const healthInfoRoutes=require('./routes/healthInfoRoutes')

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from localhost:3000
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));


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
