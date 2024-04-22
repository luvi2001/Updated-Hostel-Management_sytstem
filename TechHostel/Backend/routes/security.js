const express =require('express')

const {getUserByName,applyGatePass,verifyGatePass,deleteGatePassById,getGatePassesByNIC,dnverifyGatePass,updateStudentStatus}= require('../controllers/secuiritycontroller')

const router=express.Router()

router.get('/search',getUserByName)

// Route for applying for a gate pass
router.post('/apply', applyGatePass);

// Route for verifying a gate pass
router.put('/verify/:id', verifyGatePass);
router.put('/dnverify/:id', dnverifyGatePass);
router.put('/updatestatus/:id', updateStudentStatus);

router.delete('/delete/:id', deleteGatePassById);

router.get('/nic/:nicNumber',getGatePassesByNIC);
module.exports= router