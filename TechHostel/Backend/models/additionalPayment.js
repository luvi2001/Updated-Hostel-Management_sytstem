const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // remove extra spaces
      minlength: 2,
      maxlength: 100,
      match: /^[a-zA-Z\s]+$/, // only letters & spaces
    },

    nic: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      match: /^[0-9]{9}[VvXx]$|^[0-9]{12}$/ // Sri Lanka NIC validation
    },

    issue: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      match: /^[a-zA-Z0-9\s.,'-]+$/, // letters, numbers, spaces, and basic punctuation
    },

    amount: {
      type: Number,
      required: true,
      min: 1, // must be at least 1
      validate: {
        validator: Number.isFinite,
        message: '{VALUE} is not a valid number',
      },
    }
  },
  {
    timestamps: true,
    versionKey: false // remove "__v"
  }
);

// Index NIC for faster lookups & uniqueness enforcement
expenseSchema.index({ nic: 1 }, { unique: true });

// Clean JSON output (remove internal fields)
expenseSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
