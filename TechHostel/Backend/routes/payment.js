const express = require('express');
const {
  ewalletCreate,
  addExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  verificationDetails,
  getPaymentVerification,
  getSinglePaymentVerification
} = require('../controllers/paymentcontroller');

const router = express.Router();

// Ewallet
router.post('/ewallet/create', ewalletCreate);

// Expenses
router.get('/expense/list', getExpense);
router.post('/expense/init', addExpenses);
router.post('/expense/add', createExpense);
router.delete('/expense/delete/:id', deleteExpense);
router.put('/expense/update/:id', updateExpense);

// Payment Verification
router.post('/payment/verify', verificationDetails);

// Get all payment verifications
router.get('/payment/verify', getPaymentVerification);

// Get single payment verification by ID
router.get('/payment/verify/:id', getSinglePaymentVerification);

module.exports = router;
