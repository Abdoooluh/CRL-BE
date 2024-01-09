// cart.js
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retailer',
    required: true,
  },
  items: [{
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  }],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
