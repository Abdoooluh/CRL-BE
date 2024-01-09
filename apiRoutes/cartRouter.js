// cartRoutes.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart");

const information = {
  cart: [
    {
      route: "cart/addToCart/:retailerId/:listingId [POST]",
      desc: "Add a listing to the retailer's cart",
    },
    {
      route: "cart/removeFromCart/:retailerId/:listingId [DELETE]",
      desc: "Remove a listing from the retailer's cart",
    },
    {
      route: "cart/getCart/:retailerId [GET]",
      desc: "Get the contents of the retailer's cart",
    },
  ],
};

const cartRouter = express.Router();

cartRouter.post(
  "/addToCart/:retailerId/:listingId",
  asyncHandler(async (req, res) => {
    const { retailerId, listingId } = req.params;

    // Validate retailer and listing existence, handle errors

    let cart = await Cart.findOne({ retailerId });
    if (!cart) {
      cart = await Cart.create({ retailerId, items: [{ listingId }] });
    } else {
      const existingItem = cart.items.find(item => item.listingId.equals(listingId));

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ listingId });
      }
      
      await cart.save();
    }

    res.json(cart);
  })
);

cartRouter.delete(
  "/removeFromCart/:retailerId/:listingId",
  asyncHandler(async (req, res) => {
    const { retailerId, listingId } = req.params;

    // Validate retailer and listing existence, handle errors

    const cart = await Cart.findOne({ retailerId });
    if (cart) {
      cart.items = cart.items.filter(item => !item.listingId.equals(listingId));
      await cart.save();
    }

    res.json(cart);
  })
);

cartRouter.get(
  "/getCart/:retailerId",
  asyncHandler(async (req, res) => {
    const { retailerId } = req.params;

    // Validate retailer existence, handle errors

    const cart = await Cart.findOne({ retailerId });
    res.json(cart || { items: [] });
  })
);

const cartAPIs = { info: information, router: cartRouter };
module.exports = cartAPIs;
