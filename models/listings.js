const mongoose = require("mongoose");
const imageSchema = require("./images")

const listingSchema = mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wholeseller',
    required: true,
  },
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
  images: [imageSchema]
});

const Listings = mongoose.model("Listing", listingSchema);

module.exports = Listings;
