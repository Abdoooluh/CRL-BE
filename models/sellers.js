const Listings = require("./listings");
const mongoose = require("mongoose");

const wholesellerSchema = mongoose.Schema({
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
    required: [true, "Please enter your NTN"],
  },
  businessPhone: {
    type: String,
    required: true,
    unique: true,
  },
  platformJoiningDate: {
    type: Date,
    default: Date.now,
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
  }
});

module.exports = mongoose.model("Wholeseller", wholesellerSchema);
