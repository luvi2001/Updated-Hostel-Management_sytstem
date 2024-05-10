const express =require('express')

const {createstudentLogin,Login,getProfile}= require('../controllers/studentcontroller')
const authMiddleware = require('../middleware/authmiddleware');

const router=express.Router()

router.post('/authstudent',createstudentLogin)
router.post('/log',Login)
router.get('/profile', authMiddleware, getProfile);


module.exports= router
