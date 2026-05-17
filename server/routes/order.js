const express = require('express')
const { newOrder, getSingleOrder, orders, updateOrder, deleteOrder, myOrders } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate')
const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/myorders').get(isAuthenticatedUser, myOrders)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)


// admin route
router.route('/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders)
router.route('/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
router.route('/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)
module.exports = router