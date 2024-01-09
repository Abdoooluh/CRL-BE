const cloudinary = require("cloudinary").v2;
      
cloudinary.config({ 
  cloud_name: 'drmolzuzh', 
  api_key: '465953486611873', 
  api_secret: 'Tm5f4s3uvqsp2FUDjE-s1i5tzro' 
});

module.exports = cloudinary