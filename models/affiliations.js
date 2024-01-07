const mongoose = require("mongoose");

const affiliationSchema = mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  }
});

const Affiliation = mongoose.model("Affiliation", affiliationSchema);
module.exports = Affiliation;