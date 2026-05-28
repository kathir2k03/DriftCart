const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// DEBUG (IMPORTANT)
console.log("CLOUDINARY LOADED:", process.env.CLOUDINARY_NAME);

module.exports = cloudinary;