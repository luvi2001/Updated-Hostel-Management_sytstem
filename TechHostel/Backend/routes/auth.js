const express =require('express')

const { createLogin, loginValidate,googleLoginStudent}= require('../controllers/authcontroller')

const router=express.Router()


router.post('/createlogin',createLogin)
router.post('/validatelogin',loginValidate)
router.post("/student/google-login", googleLoginStudent);
module.exports= router
