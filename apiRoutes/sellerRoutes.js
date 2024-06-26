const express = require("express");
const asyncHandler = require("express-async-handler");
const Affiliation = require("../models/affiliations");
const Wholeseller = require("../models/sellers");
const Retailer = require("../models/retailers");
const Listings = require("../models/listings");
const cloudinary = require("../cloudinary");
const information = {
  sellers: [
    {
      route: "sellers/signIn [POST]",
      desc: "Sign in as a seller",
    },
    {
      route: "sellers/affiliatedRetailers/:sellerId [GET]",
      desc: "Fetch detailed information of all retailers affiliated with a specific seller, excluding their passwords. The seller ID is passed as a parameter in the URL.",
    },
    {
      route: "sellers/signUp [POST]",
      desc: "Sign up as a seller",
    },
    {
      route: "sellers/search/:name [GET]",
      desc: "search sellers by business name",
    },
    {
      route: "sellers/get [GET]",
      desc: "get all sellers",
    },
    {
      route: "sellers/get/:id [GET]",
      desc: "get specific seller by ID",
    },
    {
      route: "sellers/createSeller [POST]",
      desc: "create a new seller",
    },
    {
      route: "sellers/updateSeller/:id [PUT]",
      desc: "update a seller by ID",
    },
    {
      route: "sellers/deleteSeller/:id [DELETE]",
      desc: "delete a seller by ID",
    },
    {
      route: "sellers/listings/getAll [GET]",
      desc: "Get all product listings",
    },
    {
      route: "sellers/listings/getbyseller/:sellerId [GET]",
      desc: "get all listings for a specific seller",
    },
    {
      route: "sellers/listings/get/:listingId [GET]",
      desc: "get details of a specific listing by ID",
    },
    {
      route: "sellers/listings/get/:sellerId/:listingId [GET]",
      desc: "get a specific listing for a specific seller",
    },
    {
      route: "sellers/listings/create/:sellerId [POST]",
      desc: "create a new listing for a specific seller",
    },
    {
      route: "sellers/listings/update/:sellerId/:listingId [PUT]",
      desc: "update a specific listing for a specific seller",
    },
    {
      route: "sellers/listings/delete/:sellerId/:listingId [DELETE]",
      desc: "delete a specific listing for a specific seller",
    },
  ],
};

const sellerRouter = express.Router();

sellerRouter.post(
  "/signUp",
  asyncHandler(async (req, res) => {
    const sellerData = req.body;
    const seller = await SellerAPIFunctions.createSeller(sellerData);
    if (!seller) {
      res.status(404).json({ error: "User Not Registered" });
    } else {
      res.status(200).json(seller);
    }
  })
);

sellerRouter.post(
  "/signIn",
  asyncHandler(async (req, res) => {
    const sellerData = req.body;
    console.log(req.body);
    const seller = await SellerAPIFunctions.signIn(sellerData.email);
    if (!seller) {
      res.status(404).json({ error: "The User doesn't exist" });
    } else if (seller.password !== sellerData.password) {
      res
        .status(401)
        .json({ error: "The Username and the Password do not match" });
    }
    res.status(200).json(seller);
  })
);

sellerRouter.get(
  "/affiliatedRetailers/:sellerId",
  asyncHandler(async (req, res) => {
    const sellerId = req.params.sellerId;

    const affiliations = await Affiliation.find({ sellerId: sellerId }).select(
      "retailerId -_id"
    );
    const retailerIds = affiliations.map(
      (affiliation) => affiliation.retailerId
    );

    const retailers = await Retailer.find({ _id: { $in: retailerIds } }).select(
      "-password"
    );
    res.json(retailers);
  })
);

sellerRouter.get(
  "/search/:name",
  asyncHandler(async (req, res) => {
    const partialName = req.params.name;
    const sellers = await SellerAPIFunctions.searchSellersByBusinessName(
      partialName
    );
    res.json(sellers);
  })
);

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
  "/listings/get/:listingId",
  asyncHandler(async (req, res) => {
    const { listingId } = req.params;
    const listingDetails = await SellerListingFunctions.getListingDetailsById(
      listingId
    );
    res.json(listingDetails);
  })
);

sellerRouter.get(
  "/listings/getbyseller/:sellerId",
  asyncHandler(async (req, res) => {
    const sellerId = req.params.sellerId;
    const listings = await SellerListingFunctions.getAllListings(sellerId);
    res.json(listings);
  })
);

sellerRouter.get(
  "/listings/getAll",
  asyncHandler(async (req, res) => {
    const allListings = await SellerListingFunctions.getAllTheListings();
    res.json(allListings);
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
    const updatedImages = await Promise.all(
      listingData.images.map(async (image) => {
        const cloudinaryUrl = await uploadImageToCloudinary(image);
        return cloudinaryUrl;
      })
    );
    listingData.images = updatedImages;
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
    const updatedImages = await Promise.all(
      listingData.images.map(async (image) => {
        const cloudinaryUrl = await uploadImageToCloudinary(image);
        return cloudinaryUrl;
      })
    );
    console.log("updatedImages", updatedImages);
    listingData.images = updatedImages;
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
  signIn: async (email) => {
    const seller = await Wholeseller.findOne({ email });
    return seller;
  },

  getAllSellers: async () => {
    const sellers = await Wholeseller.find();
    return sellers;
  },

  getSellerById: async (sellerId) => {
    const seller = await Wholeseller.findById(sellerId);
    return seller;
  },

  searchSellersByBusinessName: async (partialName) => {
    return await Wholeseller.find({
      businessName: { $regex: partialName, $options: "i" },
    });
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
    Listings.deleteMany({ sellerId });
    return deletedSeller;
  },
};

const SellerListingFunctions = {
  getAllListings: async (sellerId) => {
    const listings = await Listings.find({ sellerId });
    if (!listings) throw new Error("Seller not found");

    return listings;
  },

  getAllTheListings: async () => {
    const allListings = await Listings.find();
    return allListings;
  },

  getListingDetailsById: async (listingId) => {
    const listing = await Listings.findById(listingId);
    if (!listing) throw new Error("Listing not found");
    return listing;
  },

  getListingById: async (sellerId, listingId) => {
    const seller = await Listings.find({ sellerId, listingId });
    if (!seller) throw new Error("Seller not found");

    const listing = seller.listings.id(listingId);
    if (!listing) throw new Error("Listing not found");

    return listing;
  },

  createListing: async (sellerId, listingData) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    const prices = validateAndFormatPrices(listingData.price);

    const newListing = await Listings.create({
      ...listingData,
      price: prices,
    });

    seller.listings.push(newListing._id);
    seller.totalListings += 1;
    await seller.save();

    return newListing;
  },

  updateListing: async (sellerId, listingId, listingData) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    const listing = await Listings.findById(listingId);
    if (!listing) throw new Error("Listing not found");

    const prices = validateAndFormatPrices(listingData.price);

    Object.assign(listing, { ...listingData, price: prices });
    await listing.save();

    return listing;
  },

  deleteListing: async (sellerId, listingId) => {
    const seller = await Wholeseller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");

    const listing = await Listings.findByIdAndDelete(listingId);
    if (!listing) throw new Error("Listing not found");

    const index = seller.listings.indexOf(listingId);
    if (index > -1) {
      seller.listings.splice(index, 1);
      seller.totalListings = Math.max(0, seller.totalListings - 1);
    }

    await seller.save();

    return listing;
  },
};

const uploadImageToCloudinary = async (imageData) => {
  try {
    const result = await cloudinary.uploader.upload(imageData, {
      folder: "ListingImgs",
      transformation: [{ width: 300, height: 300, crop: "limit" }],
    });

    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};

const validateAndFormatPrices = (prices) => {
  if (!Array.isArray(prices)) {
    throw new Error("Price must be an array");
  }

  if (prices.length > 6) {
    throw new Error("Price array can have a maximum of 6 numbers");
  }


  return prices;
};

const sellerAPIs = { info: information, router: sellerRouter };
module.exports = sellerAPIs;
