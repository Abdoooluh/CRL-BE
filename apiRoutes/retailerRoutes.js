const express = require("express");
const asyncHandler = require("express-async-handler");
const Retailer = require("../models/retailers");

const information = {
  retailers: [
    {
      route: "retailers/signIn [POST]",
      desc: "Sign in as a retailer",
    },
    {
      route: "retailers/signUp [POST]",
      desc: "Sign up as a retailer",
    },
    {
      route: "retailers/search/:name [GET]",
      desc: "search retailers by business name",
    },
    {
      route: "retailers/get [GET]",
      desc: "get all retailers",
    },
    {
      route: "retailers/get/:id [GET]",
      desc: "get specific retailer by ID",
    },
    {
      route: "retailers/createRetailer [POST]",
      desc: "create a new retailer",
    },
    {
      route: "retailers/updateRetailer/:id [PUT]",
      desc: "update a retailer by ID",
    },
    {
      route: "retailers/deleteRetailer/:id [DELETE]",
      desc: "delete a retailer by ID",
    },
  ],
};

const retailerRouter = express.Router();

retailerRouter.post(
  "/signUp",
  asyncHandler(async (req, res) => {
    const retailerData = req.body;
    const retailer = await RetailerAPIFunctions.createRetailer(retailerData);
    if(!retailer){
      res.status(404).json({error:"User Not Registered"})
    }
    else{
      res.status(200).json(retailer)
    }
  })
);

retailerRouter.post(
  "/signIn",
  asyncHandler(async (req, res) => {
    const retailerData = req.body;
    const retailer = await RetailerAPIFunctions.signIn(retailerData.email);
    console.log(retailer)
    if(!retailer){
      res.status(404).json({error:"The User doesn't exist"})
    }
    else if(retailer.password !== retailerData.password){
      res.status(401).json({error:"The Username and the Password do not match"})
    }
    res.status(200).json(retailer);
  })
);

retailerRouter.get(
  "/search/:name",
  asyncHandler(async (req, res) => {
    const partialName = req.params.name;
    const retailers = await RetailerAPIFunctions.searchRetailersByBusinessName(
      partialName
    );
    res.json(retailers);
  })
);

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
  signIn:  async (email) => {
    const seller = await Retailer.findOne({email});
    return seller;
  },

  getAllRetailers: async () => {
    const retailers = await Retailer.find();
    return retailers;
  },

  searchRetailersByBusinessName: async (partialName) => {
    return await Retailer.find({
      businessName: { $regex: partialName, $options: "i" },
    });
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
