const express =require('express')

const { ewalletCreate,addExpenses, getExpense, createExpense, deleteExpense, updateExpense, verificationDetails}= require('../controllers/paymentcontroller')

const router=express.Router()


router.post('/createewallet',ewalletCreate)
router.get('/getexpense',getExpense)
router.post('/createexpense',addExpenses)
router.post('/expenseadd',createExpense)
router.delete('/delete/:id',deleteExpense)
router.put('/update',updateExpense)
router.post('/verify',verificationDetails)


module.exports= router
