const Product = require('../models/productModel')

// Get Products - /api/v1/products
exports.getProducts = async (req, res, next) =>{
    const products = await Product.find()
    res.status(200).json(
        {
            success : true,
            count : products.length,
            products
        }
    )
}

// get single product - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        // check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// update product - /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        // check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // update product
        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,          // return updated data
                runValidators: true // apply schema validation
            }
        );

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// delete product - /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        // check if product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne()

        res.status(200).json({
            success: true,
            message : "Product deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// create product - /api/v1/products/new
exports.newProduct = async (req, res, next) =>{
 const product =  await Product.create(req.body)
   console.log("result",res)
   res.status(201).json({
    success: true,
    product 
   })
}