const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter a product name"]
  },
  description: String,
  price: {
    type: Number,
    required: [true, "Please enter a price"]
  },
  quantityAvailable: {
    type: Number,
    required: [true, "Please enter the available quantity of this product"]
  },
  minimumOrderQuantity: {
    type: Number,
    required: [true, "Please enter minimum order quantity for this product"]
  },
  deliveryTime: {
    type: String,
    required: [true, "Please enter estimated delivery time for this prodcut"]
  },
  returnPolicy: {
    type: String,
    default: "No Returns"
  }
});

const wholesellerSchema = mongoose.Schema({
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
  creditScore: {
    type: Number,
    default: 0
  },
  totalListings: {
    type: Number,
    default: 0
  },
  listings: [listingSchema],
  totalTransactions: {
    type: Number,
    default: 0
  },
  outstandingBalance: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Wholeseller", wholesellerSchema);
