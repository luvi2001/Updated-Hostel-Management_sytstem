const express =require('express')

const {registerProfile,getUserByName,getAllGatePasses,approveGatePass,dnapproveGatePass, getAllStudents, getUserByID, getUserByNIC}= require('../controllers/wardencontroller')

const router=express.Router()

router.post('/register',registerProfile)
router.get('/search/:name',getUserByName)
router.get('/searchnic/:nic',getUserByNIC)
router.get('/getgatepasses',getAllGatePasses)
router.put('/approve/:id',approveGatePass)
router.put('/dnapprove/:id',dnapproveGatePass)
router.get('/getstudents',getAllStudents)
router.get('/getstudent/:id',getUserByID)

module.exports= router
