const express = require('express')
const { newOrder, getSingleOrder, orders } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate')
const router = express.Router()

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders').get(isAuthenticatedUser, authorizeRoles('admin'), orders)

module.exports = router