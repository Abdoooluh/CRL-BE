const mongoose = require("mongoose");

const retailerSchema = mongoose.Schema({
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
  cnic: {
    type: String,
    required: [true, "Please enter your CNIC"]
  },
  ntn: {
    type: String,
    required: [true, "Please enter your NTN"]
  },
  businessPhone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  businessAddress: { 
    type: String, 
    required: true 
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
