const multer = require('multer')
const path = require('path')
const fs = require('fs')

// CREATE FOLDERS
if (!fs.existsSync('uploads/users')) {
    fs.mkdirSync('uploads/users', { recursive: true })
}

if (!fs.existsSync('uploads/product')) {
    fs.mkdirSync('uploads/product', { recursive: true })
}

// STORAGE
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        // USERS
        if (req.baseUrl.includes('user')) {
            cb(null, 'uploads/users')
        }

        // PRODUCTS
        else if (
            req.originalUrl.includes('product') ||
            req.originalUrl.includes('products')
        ) {
            cb(null, 'uploads/product')
        }

        // DEFAULT
        else {
            cb(null, 'uploads')
        }
    },

    filename: function (req, file, cb) {

        const ext = path.extname(file.originalname)

        cb(null, Date.now() + ext)
    }

})

// FILE FILTER
const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Only images are allowed'), false)
    }

}

// MULTER
const upload = multer({
    storage,
    fileFilter
})

module.exports = upload