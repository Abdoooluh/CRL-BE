const Listings = require("./listings");
const mongoose = require("mongoose");

const wholesellerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
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
  cnic: {
    type: String,
    required: [true, "Please enter your CNIC"],
  },
  ntn: {
    type: String,
    required: [true, "Please enter your NTN"],
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
  city: {
    type: String,
    required: [true, "Please enter the name of your city"],
  },
  platformJoiningDate: {
    type: Date,
    default: Date.now,
  },
  creditScore: {
    type: Number,
    default: 0,
  },
  totalListings: {
    type: Number,
    default: 0,
  },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  totalTransactions: {
    type: Number,
    default: 0,
  },
  outstandingBalance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Wholeseller", wholesellerSchema);
