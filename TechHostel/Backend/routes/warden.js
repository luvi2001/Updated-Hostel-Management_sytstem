const express =require('express')

const {registerProfile,getUserByName,getAllGatePasses,approveGatePass}= require('../controllers/wardencontroller')

const router=express.Router()

router.post('/register',registerProfile)
router.get('/search/:name',getUserByName)
router.get('/getgatepasses',getAllGatePasses)
router.put('/approve/:id',approveGatePass)


module.exports= router
