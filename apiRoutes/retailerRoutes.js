const Retailer = require("../models/retailers");
const express = require("express");
const retailerRouter = express.Router();

const information = {
  retailers: [
    {
      route: "retailer/get",
      desc: "get all retailers",
    },
    {
      route: "retailer/get/:id",
      desc: "get specific retailer by id",
    },
    {
      route: "retailer/createRetailer",
      desc: "create a new retailer",
    },
    {
      route: "retailer/updateRetailer/:id",
      desc: "update a retailer by ID",
    },
    {
      route: "reatailer/deleteRetailer/:id",
      desc: "delete a retailer by id",
    },
  ],
};

retailerRouter.get("/get", async (req, res) => {
  try {
    const retailers = await RetailerAPIFunctions.getAllRetailers();
    res.json(retailers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}),
  retailerRouter.get("/get/:id", async (req, res) => {
    const retailerId = req.params.id;

    try {
      const retailer = await RetailerAPIFunctions.getRetailerById(retailerId);

      if (!retailer) {
        return res.status(404).json({ error: "Retailer not found" });
      }

      res.json(retailer);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

retailerRouter.post("/createRetailer", async (req, res) => {
  const retailerData = req.body; 

  try {
    const newRetailer = await RetailerAPIFunctions.createRetailer(retailerData);
    res.json(newRetailer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

retailerRouter.put("/updateRetailer/:id", async (req, res) => {
  const retailerId = req.params.id;
  const retailerData = req.body;

  try {
    const updatedRetailer = await RetailerAPIFunctions.updateRetailer(
      retailerId,
      retailerData
    );

    if (!updatedRetailer) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    res.json(updatedRetailer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

retailerRouter.delete("/deleteRetailer/:id", async (req, res) => {
  const retailerId = req.params.id;

  try {
    const deletedRetailer = await RetailerAPIFunctions.deleteRetailer(
      retailerId
    );

    if (!deletedRetailer) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    res.json(deletedRetailer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const RetailerAPIFunctions = {
  getAllRetailers: async () => {
    try {
      const retailers = await Retailer.find();
      return retailers;
    } catch (error) {
      throw error;
    }
  },

  getRetailerById: async (retailerId) => {
    try {
      const retailer = await Retailer.findById(retailerId);
      return retailer;
    } catch (error) {
      throw error;
    }
  },

  createRetailer: async (retailerData) => {
    try {
      const newRetailer = await Retailer.create(retailerData);
      return newRetailer;
    } catch (error) {
      throw error;
    }
  },

  updateRetailer: async (retailerId, retailerData) => {
    try {
      const updatedRetailer = await Retailer.findByIdAndUpdate(
        retailerId,
        retailerData,
        { new: true }
      );
      return updatedRetailer;
    } catch (error) {
      throw error;
    }
  },

  deleteRetailer: async (retailerId) => {
    try {
      const deletedRetailer = await Retailer.findByIdAndRemove(retailerId);
      return deletedRetailer;
    } catch (error) {
      throw error;
    }
  },
};
const retailerAPIs = { info: information, router: retailerRouter };
module.exports = retailerAPIs;
