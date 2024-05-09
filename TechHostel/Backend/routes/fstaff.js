const express =require('express')
const router=express.Router()
const {getAllTasks, jobDone,jobNotDone}=require("../controllers/fscontroller")


router.get('/gettasks',getAllTasks)
router.put('/jobdone/:id',jobDone)
router.put('/jobnotdone/:id',jobNotDone)


module.exports=router