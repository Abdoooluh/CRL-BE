const express = require("express");
const asyncHandler = require("express-async-handler");
const Retailer = require("../models/retailers");

const information = {
  retailers: [
    {
      route: "[GET] retailers/get",
      desc: "get all retailers",
    },
    {
      route: "[GET] retailers/get/:id",
      desc: "get specific retailer by ID",
    },
    {
      route: "[POST] retailers/createRetailer",
      desc: "create a new retailer",
    },
    {
      route: "[PUT] retailers/updateRetailer/:id",
      desc: "update a retailer by ID",
    },
    {
      route: "[DELETE] retailers/deleteRetailer/:id",
      desc: "delete a retailer by ID",
    },
  ],
};

const retailerRouter = express.Router();

retailerRouter.get(
  "/get",
  asyncHandler(async (req, res) => {
    const retailers = await RetailerAPIFunctions.getAllRetailers();
    res.json(retailers);
  })
);

retailerRouter.get(
  "/get/:id",
  asyncHandler(async (req, res) => {
    const retailerId = req.params.id;
    const retailer = await RetailerAPIFunctions.getRetailerById(retailerId);

    if (!retailer) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    res.json(retailer);
  })
);

retailerRouter.post(
  "/createRetailer",
  asyncHandler(async (req, res) => {
    console.log(req.body); 
    const retailerData = req.body;
    const newRetailer = await RetailerAPIFunctions.createRetailer(retailerData);
    res.json(newRetailer);
  })
);

retailerRouter.put(
  "/updateRetailer/:id",
  asyncHandler(async (req, res) => {
    const retailerId = req.params.id;
    const retailerData = req.body;
    const updatedRetailer = await RetailerAPIFunctions.updateRetailer(
      retailerId,
      retailerData
    );

    if (!updatedRetailer) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    res.json(updatedRetailer);
  })
);

retailerRouter.delete(
  "/deleteRetailer/:id",
  asyncHandler(async (req, res) => {
    const retailerId = req.params.id;
    const deletedRetailer = await RetailerAPIFunctions.deleteRetailer(
      retailerId
    );

    if (!deletedRetailer) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    res.json(deletedRetailer);
  })
);

const RetailerAPIFunctions = {
  getAllRetailers: async () => {
    const retailers = await Retailer.find();
    return retailers;
  },

  getRetailerById: async (retailerId) => {
    const retailer = await Retailer.findById(retailerId);
    return retailer;
  },

  createRetailer: async (retailerData) => {
    const newRetailer = await Retailer.create(retailerData);
    return newRetailer;
  },

  updateRetailer: async (retailerId, retailerData) => {
    const updatedRetailer = await Retailer.findByIdAndUpdate(
      retailerId,
      retailerData,
      { new: true }
    );
    return updatedRetailer;
  },

  deleteRetailer: async (retailerId) => {
    const deletedRetailer = await Retailer.findByIdAndDelete(retailerId);
    return deletedRetailer;
  },
};

const retailerAPIs = { info: information, router: retailerRouter };
module.exports = retailerAPIs;
