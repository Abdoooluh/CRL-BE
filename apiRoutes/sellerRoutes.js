const Wholeseller = require("../models/sellers");
const express = require("express");
const sellerRouter = express.Router();

const information = {
  sellers: [
    {
      route: "seller/get",
      desc: "get all sellers",
    },
    {
      route: "seller/get/:id",
      desc: "get specific seller by id",
    },
    {
      route: "seller/createSeller",
      desc: "create a new seller",
    },
    {
      route: "seller/updateSeller/:id",
      desc: "update a seller by ID",
    },
    {
      route: "seller/deleteSeller/:id",
      desc: "delete a seller by id",
    },
  ],
};

sellerRouter.get("/get", async (req, res) => {
  try {
    const sellers = await SellerAPIFunctions.getAllSellers();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

sellerRouter.get("/get/:id", async (req, res) => {
  const sellerId = req.params.id;

  try {
    const seller = await SellerAPIFunctions.getSellerById(sellerId);

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

sellerRouter.post("/createSeller", async (req, res) => {
  const sellerData = req.body;

  try {
    const newSeller = await SellerAPIFunctions.createSeller(sellerData);
    res.json(newSeller);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

sellerRouter.put("/updateSeller/:id", async (req, res) => {
  const sellerId = req.params.id;
  const sellerData = req.body;

  try {
    const updatedSeller = await SellerAPIFunctions.updateSeller(
      sellerId,
      sellerData
    );

    if (!updatedSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

sellerRouter.delete("/deleteSeller/:id", async (req, res) => {
  const sellerId = req.params.id;

  try {
    const deletedSeller = await SellerAPIFunctions.deleteSeller(sellerId);

    if (!deletedSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json(deletedSeller);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const SellerAPIFunctions = {
  getAllSellers: async () => {
    try {
      const sellers = await Wholeseller.find();
      return sellers;
    } catch (error) {
      throw error;
    }
  },

  getSellerById: async (sellerId) => {
    try {
      const seller = await Wholeseller.findById(sellerId);
      return seller;
    } catch (error) {
      throw error;
    }
  },

  createSeller: async (sellerData) => {
    try {
      const newSeller = await Wholeseller.create(sellerData);
      return newSeller;
    } catch (error) {
      throw error;
    }
  },

  updateSeller: async (sellerId, sellerData) => {
    try {
      const updatedSeller = await Wholeseller.findByIdAndUpdate(
        sellerId,
        sellerData,
        { new: true }
      );
      return updatedSeller;
    } catch (error) {
      throw error;
    }
  },

  deleteSeller: async (sellerId) => {
    try {
      const deletedSeller = await Wholeseller.findByIdAndRemove(sellerId);
      return deletedSeller;
    } catch (error) {
      throw error;
    }
  },
};

const sellerAPIs = { info: information, router: sellerRouter };
module.exports = sellerAPIs;
