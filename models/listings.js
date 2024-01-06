const mongoose = require("mongoose");
const imageSchema = require("./images")

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
  minimumOrderQuantity: {
    type: Number,
    required: [true, "Please enter minimum order quantity for this product"]
  },
  images: [imageSchema], // Array of images
});

const Listings = mongoose.model("Listing", listingSchema);

module.exports = Listings;
