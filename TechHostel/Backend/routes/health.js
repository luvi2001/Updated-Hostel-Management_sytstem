const express =require('express')

const { createHealthProfile,deleteProf}= require('../controllers/hcontroller')

const router=express.Router()

router.post('/create',createHealthProfile)

router.post('/delete',deleteProf)

module.exports= router


