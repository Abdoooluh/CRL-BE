const express = require("express");
const asyncHandler = require("express-async-handler");
const Wholeseller = require("../models/sellers");

const information = {
  sellers: [
    {
      route: "[GET] sellers/get",
      desc: "get all sellers",
    },
    {
      route: "[GET] sellers/get/:id",
      desc: "get specific seller by ID",
    },
    {
      route: "[POST] sellers/createSeller",
      desc: "create a new seller",
    },
    {
      route: "[PUT] sellers/updateSeller/:id",
      desc: "update a seller by ID",
    },
    {
      route: "[DELETE] sellers/deleteSeller/:id",
      desc: "delete a seller by ID",
    },
    {
      route: "[GET] sellers/listings/get/:sellerId",
      desc: "get all listings for a specific seller",
    },
    {
      route: "[GET] sellers/listings/get/:sellerId/:listingId",
      desc: "get a specific listing for a specific seller",
    },
    {
      route: "[POST] sellers/listings/create/:sellerId",
      desc: "create a new listing for a specific seller",
    },
    {
      route: "[PUT] sellers/listings/update/:sellerId/:listingId",
      desc: "update a specific listing for a specific seller",
    },
    {
      route: "[DELETE] sellers/listings/delete/:sellerId/:listingId",
      desc: "delete a specific listing for a specific seller",
    },
  ],
};

const sellerRouter = express.Router();

sellerRouter.get(
  "/get",
  asyncHandler(async (req, res) => {
    const sellers = await SellerAPIFunctions.getAllSellers();
    res.json(sellers);
  })
);

sellerRouter.get(
  "/get/:id",
  asyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    const seller = await SellerAPIFunctions.getSellerById(sellerId);

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json(seller);
  })
);

sellerRouter.post(
  "/createSeller",
  asyncHandler(async (req, res) => {
    const sellerData = req.body;
    const newSeller = await SellerAPIFunctions.createSeller(sellerData);
    res.json(newSeller);
  })
);

sellerRouter.put(
  "/updateSeller/:id",
  asyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    const sellerData = req.body;
    const updatedSeller = await SellerAPIFunctions.updateSeller(
      sellerId,
      sellerData
    );

    if (!updatedSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json(updatedSeller);
  })
);

sellerRouter.delete(
  "/deleteSeller/:id",
  asyncHandler(async (req, res) => {
    const sellerId = req.params.id;
    const deletedSeller = await SellerAPIFunctions.deleteSeller(sellerId);

    if (!deletedSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.json(deletedSeller);
  })
);

sellerRouter.get(
  "/listings/get/:sellerId",
  asyncHandler(async (req, res) => {
    const sellerId = req.params.sellerId;
    const listings = await SellerListingFunctions.getAllListings(sellerId);
    res.json(listings);
  })
);

sellerRouter.get(
  "/listings/get/:sellerId/:listingId",
  asyncHandler(async (req, res) => {
    const { sellerId, listingId } = req.params;
    const listing = await SellerListingFunctions.getListingById(
      sellerId,
      listingId
    );
    res.json(listing);
  })
);

sellerRouter.post(
  "/listings/create/:sellerId",
  asyncHandler(async (req, res) => {
    const sellerId = req.params.sellerId;
    const listingData = req.body;
    const newListing = await SellerListingFunctions.createListing(
      sellerId,
      listingData
    );
    res.json(newListing);
  })
);

sellerRouter.put(
  "/listings/update/:sellerId/:listingId",
  asyncHandler(async (req, res) => {
    const { sellerId, listingId } = req.params;
    const listingData = req.body;
    const updatedListing = await SellerListingFunctions.updateListing(
      sellerId,
      listingId,
      listingData
    );
    res.json(updatedListing);
  })
);

sellerRouter.delete(
  "/listings/delete/:sellerId/:listingId",
  asyncHandler(async (req, res) => {
    const { sellerId, listingId } = req.params;
    const deletedListing = await SellerListingFunctions.deleteListing(
      sellerId,
      listingId
    );
    res.json(deletedListing);
  })
);

const SellerAPIFunctions = {
  getAllSellers: async () => {
    const sellers = await Wholeseller.find();
    return sellers;
  },

  getSellerById: async (sellerId) => {
    const seller = await Wholeseller.findById(sellerId);
    return seller;
  },

  createSeller: async (sellerData) => {
    const newSeller = await Wholeseller.create(sellerData);
    return newSeller;
  },

  updateSeller: async (sellerId, sellerData) => {
    const updatedSeller = await Wholeseller.findByIdAndUpdate(
      sellerId,
      sellerData,
      { new: true }
    );
    return updatedSeller;
  },

  deleteSeller: async (sellerId) => {
    const deletedSeller = await Wholeseller.findByIdAndDelete(sellerId);
    return deletedSeller;
  },
};

const SellerListingFunctions = {
  getAllListings: async (sellerId) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    return seller.listings;
  },

  getListingById: async (sellerId, listingId) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    const listing = seller.listings.id(listingId);
    if (!listing) throw new Error("Listing not found");

    return listing;
  },

  createListing: async (sellerId, listingData) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    const newListing = new Listings(listingData);
    seller.listings.push(newListing);
    await seller.save();

    return newListing;
  },

  updateListing: async (sellerId, listingId, listingData) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    const listing = seller.listings.id(listingId);
    if (!listing) throw new Error("Listing not found");

    Object.assign(listing, listingData);
    await seller.save();

    return listing;
  },

  deleteListing: async (sellerId, listingId) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    const listing = seller.listings.id(listingId);
    if (!listing) throw new Error("Listing not found");

    listing.remove();
    await seller.save();

    return listing;
  },
};


const sellerAPIs = { info: information, router: sellerRouter };
module.exports = sellerAPIs;
