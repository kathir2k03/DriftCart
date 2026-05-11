const Product = require('../models/productModel');
const { search, filterByCategory, filterByPrice, filterByRatings, pagination } = require('../utils/apiFeatures');

exports.getProducts = async (req, res, next) => {
    try {

        let query = Product.find();

        query = search(query, req.query);
        query = filterByCategory(query, req.query);
        query = filterByPrice(query, req.query);
        query = filterByRatings(query, req.query)

        // clone query before pagination
        const filteredProductsCount = await query.clone().countDocuments();

        // pagination
        query = pagination(query, req.query);

        // final products
        const products = await query;

        res.status(200).json({
            success: true,
            count: filteredProductsCount,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to send Products"
        });

    }
};

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
            message: "Product deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// create product - /api/v1/products/new
exports.newProduct = async (req, res, next) => {

    req.body.user = req.user.id // getting from authToken function

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}


// Create and Update Review - api/v1/review

exports.createReview = async (req, res, next) => {
    const { productId, rating, comment } = req.body
    console.log(req.user.name)
    const review = {  // these are all we get from authenticated user function itself
        user: req.user.id,
        rating: rating,
        comment: comment,
        name: req.user.name
    }

    const product = await Product.findById(productId)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    // finding useer already has review
    const isReviewed = product.reviews.find(data =>
        data.user && data.user.toString() === req.user.id.toString()
    );

    if (isReviewed) {
        // updating the review
        product.reviews.forEach(item => {
            if (item.user && item.user.toString() === req.user.id.toString()) {
                item.comment = comment;
                item.rating = rating;
                item.name = req.user.name
            }
        });
    } else {
        // creating the review
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }

    // ratings average
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc
    }, 0) / product.reviews.length
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        review
    })
}

// Get Review - /api/v1/review
exports.getReviews = async (req, res, next) => {
    const product = await Product.findById(req.params.productId)

    if (!product) {
        res.status(400).json({
            success: false,
            message: "Not Data found"
        })
    }
    res.status(200).json({
        success: true,
        message: product.reviews
    })
}

// Delete Review - /api/v1/review/:productId/:reviewId
exports.deleteReview = async (req, res, next) => {
    try {
        const { productId, reviewId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // filter out the review to delete
        const reviews = product.reviews.filter(
            review => review._id.toString() !== reviewId.toString()
        );

        const numOfReviews = reviews.length;

        // calculate new average rating
        let ratings =
            reviews.reduce((acc, item) => acc + item.rating, 0) /
            (reviews.length || 1);

        ratings = isNaN(ratings) ? 0 : ratings;

        await Product.findByIdAndUpdate(productId, {
            reviews,
            numOfReviews,
            ratings
        });

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};