const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// STORAGE CONFIG
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = "draftkart";

        // separate folders (like your old system)
        if (req.baseUrl.includes("user")) {
            folder = "draftkart/users";
        } else if (
            req.originalUrl.includes("product")
        ) {
            folder = "draftkart/products";
        }

        return {
            folder: folder,
            allowed_formats: ["jpg", "jpeg", "png", "webp"]
        };
    }
});

// FILE FILTER
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;