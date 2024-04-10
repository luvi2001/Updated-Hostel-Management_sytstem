const express =require('express')

const {registerProfile,getUserByName}= require('../controllers/wardencontroller')

const router=express.Router()

router.post('/register',registerProfile)
router.get('/search',getUserByName)

module.exports= router
