const express =require('express')

const {getUserByName,applyGatePass,verifyGatePass,approveGatePass,getGatePassesByNIC}= require('../controllers/secuiritycontroller')

const router=express.Router()

router.get('/search',getUserByName)

// Route for applying for a gate pass
router.post('/apply', applyGatePass);

// Route for verifying a gate pass
router.put('/verify/:id', verifyGatePass);

// Route for approving a gate pass
router.put('/approve/:id', approveGatePass);

router.get('/nic/:nicNumber',getGatePassesByNIC);
module.exports= router