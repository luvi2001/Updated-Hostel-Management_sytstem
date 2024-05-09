const express =require('express')

const {registerProfile,getUserByName,getAllGatePasses,approveGatePass,dnapproveGatePass, getAllStudents, getUserByID, getUserByNIC,  addTasks, getAllTasks, deleteTaskById,updateTask, deleteStudentProfile}= require('../controllers/wardencontroller')

const router=express.Router()

router.post('/register',registerProfile)
router.get('/search/:name',getUserByName)
router.get('/searchnic/:nic',getUserByNIC)
router.get('/getgatepasses',getAllGatePasses)
router.get('/gettasks',getAllTasks)
router.put('/approve/:id',approveGatePass)
router.put('/dnapprove/:id',dnapproveGatePass)
router.get('/getstudents',getAllStudents)
router.get('/getstudent/:id',getUserByID)
router.post('/addtask',addTasks)
router.delete('/delete/:id', deleteTaskById)
router.put('/updatetask/:id',updateTask)
router.delete('/deletestudent/:id', deleteStudentProfile)

module.exports= router
