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

const Listings = mongoose.model("Listing", listingSchema);

module.exports = Listings;