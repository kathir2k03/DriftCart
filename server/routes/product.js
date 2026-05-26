const express = require('express')
const { getProducts, newProduct, getSingleProduct, deleteProduct, updateProduct, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate') // importing the authvalidations 
const upload = require('../middleware/multer')

const router = express.Router()

router.route('/products').get( getProducts) // calling the auth function with 1st parameter
router.route('/product/:id').get(getSingleProduct)

// review apis
router.route('/review').put(isAuthenticatedUser, createReview)
router.route('/admin/review/:productId').get(isAuthenticatedUser, getReviews)
router.route('/admin/review/:productId/:reviewId').delete(isAuthenticatedUser, deleteReview)

router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 5), newProduct)
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 5), updateProduct)
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

module.exports = router