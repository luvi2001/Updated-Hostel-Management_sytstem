const mongoose = require('mongoose');
const Ewallet = require('../models/ewalletmodel');
const Expense = require('../models/additionalPayment');
const Payment = require('../models/verificationmodel');

// ✅ Helper function to safely cast ObjectId
const toObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  return new mongoose.Types.ObjectId(id);
};

// ==========================
// Create Expense (deduct from wallet)
// ==========================
const createExpense = async (req, res) => {
  try {
    const { name, nic, issue, amount } = req.body;

    if (!name || !nic || !issue || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid expense input' });
    }

    // ✅ Find wallet by NIC
    const wallet = await Ewallet.findOne({ nic: nic.trim().toUpperCase() });
    if (!wallet) {
      return res.status(404).json({ error: 'Ewallet not found' });
    }

    // ✅ Check if enough balance
    if (wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }

    // ✅ Deduct balance
    wallet.balance -= amount;
    await wallet.save();

    // ✅ Save expense
    const newProfile = new Expense({ name, nic, issue, amount });
    await newProfile.save();

    res.status(201).json({
      message: 'Expense added & balance updated',
      expense: newProfile,
      walletBalance: wallet.balance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ==========================
// Get Expenses
// ==========================
const getExpense = async (req, res) => {
  try {
    const data = await Expense.find({}).lean();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// ==========================
// Add Expense (default fields)
// ==========================
const addExpenses = async (req, res) => {
  try {
    const { name, nic } = req.body;

    if (!name || !nic) {
      return res.status(400).json({ error: 'Name & NIC required' });
    }

    const newProfile = new Expense({
      name: name.trim(),
      nic: nic.trim().toUpperCase(),
      nameOfCost: ' ',
      issue: ' ',
      amount: 0,
    });

    await newProfile.save();
    res.status(201).json({ message: 'Expense added', data: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ==========================
// Create Ewallet
// ==========================
const ewalletCreate = async (req, res) => {
  try {
    const { name, nic } = req.body;

    if (!name || !nic) {
      return res.status(400).json({ error: 'Name & NIC required' });
    }

    const newProfile = new Ewallet({
      name: name.trim(),
      nic: nic.trim().toUpperCase(),
      balance: 0,
    });

    await newProfile.save();
    res.status(201).json({ message: 'Ewallet created', data: newProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ==========================
// Delete Expense
// ==========================
const deleteExpense = async (req, res) => {
  try {
    const id = toObjectId(req.params.id);
    const data = await Expense.deleteOne({ _id: id });
    res.json({ success: true, message: 'Expense deleted', data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid ID' });
  }
};

// ==========================
// Update Expense
// ==========================
const updateExpense = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    if (!_id) return res.status(400).json({ error: 'Expense ID required' });

    const id = toObjectId(_id);
    const data = await Expense.updateOne({ _id: id }, { $set: rest });

    res.json({ success: true, message: 'Expense updated', data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid request' });
  }
};

// ==========================
// Verification Payment (credit wallet)
// ==========================
// controllers/paymentcontroller.js
const { body, validationResult } = require("express-validator");
const mongoSanitize = require("express-mongo-sanitize");

const verificationDetails = async (req, res) => {
  try {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { studentName, nicNumber, accountNumber, bank, amount, date } = req.body;

    // Create sanitized payment document
    const payment = new Payment({
      studentName: String(studentName).trim(),
      nicNumber: String(nicNumber).trim(),
      accountNumber: String(accountNumber).trim(),
      bank: String(bank).trim(),
      amount: Number(amount),
      date: new Date(date),
    });

    await payment.save();
    res.json({ success: true, message: "Payment details saved securely." });
  } catch (error) {
    console.error("Error saving payment details:", error);
    res.status(500).json({ success: false, error: "Error saving payment details." });
  }
};

const getPaymentVerification = async (req, res) => {
  try {
    const payments = await Payment.find().select('-accountNumber'); 
    // accountNumber excluded for security

    if (!payments || payments.length === 0) {
      return res.status(404).json({ success: false, message: 'No payment records found' });
    }

    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching payment verification details:", error);
    return res.status(500).json({ success: false, error: "Error fetching payment verification details." });
  }
};

// ✅ Get single payment verification by ID
const getSinglePaymentVerification = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).select('-accountNumber');

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    return res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching payment verification:", error);
    return res.status(500).json({ success: false, error: "Error fetching payment verification." });
  }
};

module.exports = {
  ewalletCreate,
  addExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  verificationDetails,
  getPaymentVerification,
  getSinglePaymentVerification
};
