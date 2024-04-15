const express =require('express')

const {getUserByName}= require('../controllers/secuiritycontroller')

const router=express.Router()

router.get('/search',getUserByName)

module.exports= router