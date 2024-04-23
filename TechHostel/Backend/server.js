// Connection file to MongoDB
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const healthRoutes= require('./routes/health')
const wardenRoutes=require('./routes/warden')
const securityRoutes=require('./routes/security')
const authRoutes=require('./routes/auth')

app.use(express.json());

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

app.use('/api/health',healthRoutes)
app.use('/api/warden',wardenRoutes)
app.use('/api/security',securityRoutes)
app.use('/api/auth',authRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
