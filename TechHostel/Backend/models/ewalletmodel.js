const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ewalletSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
      minlength: 2,
      maxlength: 100,
      match: /^[a-zA-Z\s]+$/, // Only letters + spaces (basic sanitization)
    },

    nic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: /^[0-9]{9}[VvXx]$|^[0-9]{12}$/ // Sri Lanka NIC old/new format validation
    },

    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0, // Prevents negative balance unless explicitly allowed
      validate: {
        validator: Number.isFinite,
        message: '{VALUE} is not a valid number',
      },
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false // Prevents "__v" field
  }
);

// Prevent JSON injection (remove MongoDB operators like $gt, $ne when converting to JSON)
ewalletSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

// Index NIC for faster lookups & uniqueness enforcement
ewalletSchema.index({ nic: 1 }, { unique: true });

module.exports = mongoose.model('Ewallet', ewalletSchema);
