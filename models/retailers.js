const mongoose = require("mongoose");

const retailerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  cnic: {
    type: String,
    required: [true, "Please enter your CNIC"]
  },
  ntn: {
    type: String,
    required: [true, "Please enter your NTN"]
  },
  city: {
    type: String,
    required: [true, "Please enter the name of your city"]
  },
  platformJoiningDate: {
    type: Date,
    default: Date.now
  },
  businessStartYear: {
    type: Number,
    required: [true, "Please enter the year when your business was established"]
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
