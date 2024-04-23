const express =require('express')

const { ewalletCreate,addExpenses, getExpense, createExpense}= require('../controllers/paymentcontroller')

const router=express.Router()


router.post('/createewallet',ewalletCreate)
router.get('/getexpense',getExpense)
router.post('/createexpense',addExpenses)
router.post('/expenseadd',createExpense)


module.exports= router
