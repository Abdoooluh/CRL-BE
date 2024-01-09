const mongoose = require("mongoose");
const cloudinary = require("../cloudinary");

const listingSchema = mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wholeseller',
    required: true,
  },
  productName: {
    type: String,
    required: [true, "Please enter a product name"]
  },
  description: String,
  price: {
    type: [Number], 
    validate: {
      validator: function (prices) {
        return prices.length <= 6;
      },
      message: "Price array can have a maximum of 6 numbers",
    },
    required: [true, "Please provide the price"],
  },
  minimumOrderQuantity: {
    type: Number,
    required: [true, "Please enter minimum order quantity for this product"]
  },
  images: [{
    type: String,
  }],
});

const uploadImageToCloudinary = async (imageData) => {
  try {
    const result = await cloudinary.uploader.upload(imageData, {
      folder: 'ListingImgs', 
      transformation: [{ width: 300, height: 300, crop: 'limit' }], // Optional: Resize and crop image
    });

    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary');
  }
};

// Middleware to handle image uploads
listingSchema.pre('save', async function (next) {
  const listing = this;

  // Upload each image to Cloudinary and add Cloudinary URL to the images array
  const promises = listing.images.map(async (image, index) => {
    if (image) {
      const cloudinaryUrl = await uploadImageToCloudinary(image);
      listing.images[index] = cloudinaryUrl;
    }
  });

  await Promise.all(promises);
  next();
});

const Listings = mongoose.model("Listing", listingSchema);

module.exports = Listings;
