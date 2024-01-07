const mongoose = require("mongoose");

const retailerSchema = mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  NTN: {
    type: String,
    required: [true, "Please enter your NTN"]
  },
  businessPhone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  platformJoiningDate: {
    type: Date,
    default: Date.now
  },
  creditScore: {
    type: Number,
    default: 0
  },
  totalOrdersPlaced: {
    type: Number,
    default: 0
  },
  totalTransactions: {
    type: Number,
    default: 0
  },
  averageTransactionAmount: {
    type: Number,
    default: 0
  },
  outstandingBalance: {
    type: Number,
    default: 0
  }
});

const Retailers = mongoose.model("Retailer", retailerSchema);
module.exports = Retailers;
