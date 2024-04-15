const express =require('express')

const {registerProfile,getUserByName,approveGatePass}= require('../controllers/wardencontroller')

const router=express.Router()

router.post('/register',registerProfile)
router.get('/search',getUserByName)

// Route for approving a gate pass
router.put('/approve/:id', approveGatePass)
module.exports= router
