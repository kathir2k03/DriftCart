const express = require('express')
const { getProducts, newProduct, getSingleProduct, deleteProduct, updateProduct } = require('../controllers/productController')
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authenticate') // importing the authvalidations 

const router = express.Router()

router.route('/products').get(isAuthenticatedUser, getProducts) // calling the auth function with 1st parameter
router.route('/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/product/:id').put(updateProduct)
router.route('/product/:id').delete(deleteProduct)

module.exports = router