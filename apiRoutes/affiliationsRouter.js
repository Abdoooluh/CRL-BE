const express = require('express')
const asyncHandler = require('express-async-handler');
const Affiliation = require('../models/affiliations'); // Path to your Affiliation model

const information = {
    affiliations: [
      {
        route: "affiliations/add [POST]",
        desc: "Create a new affiliation between a seller and a retailer. Requires seller's ID and retailer's ID in the request body."
      }      
    ]
  };

const router = express.Router();

router.post('/add', asyncHandler(async (req, res) => {
    const { sellerId, retailerId } = req.body;

    const newAffiliation = new Affiliation({
        sellerId: sellerId,
        retailerId: retailerId
    });

    await newAffiliation.save();
    res.status(201).json(newAffiliation);
}));



const affiliationAPIs = { info: information, router: router };
module.exports = affiliationAPIs;