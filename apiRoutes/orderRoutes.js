const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../models/orders");

const information = {
    orders: [
      {
        route: "[GET] orders/get",
        desc: "get all orders",
      },
      {
        route: "[GET] orders/get/:id",
        desc: "get specific order by id",
      },
      {
        route: "[POST] orders/createOrder",
        desc: "create a new order",
      },
      {
        route: "[PUT] orders/updateOrder/:id",
        desc: "update an order by ID",
      },
      {
        route: "[DELETE] orders/deleteOrder/:id",
        desc: "delete an order by id",
      },
      {
        route: "[GET] orders/getBySeller/:sellerId",
        desc: "get orders by seller ID",
      },
      {
        route: "[GET] orders/getByRetailer/:retailerId",
        desc: "get orders by retailer ID",
      },
      {
        route: "[GET] orders/getByListing/:listingId",
        desc: "get orders by listing ID",
      },
    ],
  };

const orderRouter = express.Router();

orderRouter.get(
  "/get",
  asyncHandler(async (req, res) => {
    const orders = await OrderAPIFunctions.getAllOrders();
    res.json(orders);
  })
);

orderRouter.get(
  "/get/:id",
  asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await OrderAPIFunctions.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  })
);

orderRouter.get(
    "/getBySeller/:sellerId",
    asyncHandler(async (req, res) => {
      const sellerId = req.params.sellerId;
      const orders = await OrderAPIFunctions.getOrdersBySellerId(sellerId);
      res.json(orders);
    })
  );
  
  orderRouter.get(
    "/getByRetailer/:retailerId",
    asyncHandler(async (req, res) => {
      const retailerId = req.params.retailerId;
      const orders = await OrderAPIFunctions.getOrdersByRetailerId(retailerId);
      res.json(orders);
    })
  );
  
  orderRouter.get(
    "/getByListing/:listingId",
    asyncHandler(async (req, res) => {
      const listingId = req.params.listingId;
      const orders = await OrderAPIFunctions.getOrdersByListingId(listingId);
      res.json(orders);
    })
  );

orderRouter.post(
  "/createOrder",
  asyncHandler(async (req, res) => {
    const orderData = req.body;
    const newOrder = await OrderAPIFunctions.createOrder(orderData);
    res.json(newOrder);
  })
);

orderRouter.put(
  "/updateOrder/:id",
  asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const orderData = req.body;

    const updatedOrder = await OrderAPIFunctions.updateOrder(orderId, orderData);

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  })
);

orderRouter.delete(
  "/deleteOrder/:id",
  asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const deletedOrder = await OrderAPIFunctions.deleteOrder(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(deletedOrder);
  })
);

const OrderAPIFunctions = {
  getAllOrders: async () => {
    return await Order.find();
  },

  getOrderById: async (orderId) => {
    return await Order.findById(orderId);
  },

  createOrder: async (orderData) => {
    return await Order.create(orderData);
  },

  updateOrder: async (orderId, orderData) => {
    return await Order.findByIdAndUpdate(orderId, orderData, { new: true });
  },

  deleteOrder: async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
  },
};

const orderAPIs = { info: information, router: orderRouter };
module.exports = orderAPIs;