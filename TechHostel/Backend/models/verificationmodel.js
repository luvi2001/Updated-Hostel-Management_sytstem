const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // for hashing

const PaymentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      match: /^[a-zA-Z\s]+$/, // only letters & spaces
    },

    nicNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      match: /^[0-9]{9}[VvXx]$|^[0-9]{12}$/, // Sri Lanka NIC validation
    },

    accountNumber: {
      type: String,
      required: true,
      select: false // never return the raw value
    },

    bank: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isFinite,
        message: '{VALUE} is not a valid number',
      },
    },

    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['in', 'out', 'not_verified'],
      default: 'not_verified',
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// 🔑 Hash account number before saving
PaymentSchema.pre('save', async function (next) {
  if (!this.isModified('accountNumber')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.accountNumber = await bcrypt.hash(this.accountNumber, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔎 Method to verify account number (when needed)
PaymentSchema.methods.compareAccountNumber = async function (enteredAccNo) {
  return await bcrypt.compare(enteredAccNo, this.accountNumber);
};

module.exports = mongoose.model('Payment', PaymentSchema);
