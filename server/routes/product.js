const express = require('express')
const { getProducts, newProduct, getSingleProduct, deleteProduct, updateProduct, createReview, getReviews, deleteReview } = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate') // importing the authvalidations 

const router = express.Router()

router.route('/products').get( getProducts) // calling the auth function with 1st parameter
router.route('/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').put(updateProduct)
router.route('/product/:id').delete(deleteProduct)

// review apis
router.route('/review').put(isAuthenticatedUser, createReview)
router.route('/review/:id').get(isAuthenticatedUser, getReviews)
router.route('/review/:productId/:reviewId').delete(isAuthenticatedUser, deleteReview)
module.exports = router