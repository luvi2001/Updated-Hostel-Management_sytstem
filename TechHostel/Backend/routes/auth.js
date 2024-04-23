const express =require('express')

const { createLogin, loginValidate}= require('../controllers/authcontroller')

const router=express.Router()


router.post('/createlogin',createLogin)
router.post('/validatelogin',loginValidate)

module.exports= router
