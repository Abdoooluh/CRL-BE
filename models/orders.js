const mongoose = require("mongoose");
const Retailer = require("./retailers");
const Seller = require("./sellers");

const orderSchema = mongoose.Schema({
  orderNumber: {
    type: Number,
    required: [true, "Please provide the order number"],
    unique: true,
  },
  retailer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
    required: [true, "Please provide the retailer ID"],
  },
  retailerName:{
    type: String,
    required: true,
  },
  retailerContact:{
    type: String, 
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "Please provide the seller ID"],
  },
  comments:{
    type: String,
  },
  products: [
    {
      listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: [true, "Please provide the listing ID"],
      },
      quantity: {
        type: Number,
        required: [true, "Please provide the quantity"],
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  fulfillmentDate: {
    type: Date,
  },
  totalAmount: {
    type: Number,
    required: [true, "Please provide the total amount"],
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
});


orderSchema.pre('validate', async function (next) {
  if (this.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = count + 1;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;