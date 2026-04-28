const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const Product = require('../models/productModel');
const products = require('../data/products.json');

// load env correctly
dotenv.config({
    path: path.join(__dirname, '../config/config.env')
});

// debug
console.log("DB URI:", process.env.DB_LOCAL_URI);

// connect DB
mongoose.connect(process.env.DB_LOCAL_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const seedData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("Data Imported Successfully");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedData();