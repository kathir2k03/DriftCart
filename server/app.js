const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()

// (optional backup)
// require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
const cloudinary = require("./config/cloudinary");
console.log("ENV CHECK:", {
    name: process.env.CLOUDINARY_NAME,
    key: process.env.CLOUDINARY_API_KEY ? "YES" : "NO"
});
// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.get("/cloudinary-test", async (req, res) => {
    try {
        const result = await cloudinary.api.ping();

        return res.status(200).json({
            success: true,
            message: "Cloudinary working",
            result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
});

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// health check route (IMPORTANT for Vercel)
app.get("/", (req, res) => {
    res.send("DriftKart Backend Running");
});



module.exports = app;