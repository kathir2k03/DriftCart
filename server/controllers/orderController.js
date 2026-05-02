const Order = require('../models/orderModel')

// Create New Order - api/v1/order/new
exports.newOrder = async (req, res, next) => {
   const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
   } = req.body

   const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt : Date.now(),
    user: req.user.id    
   })

   if(!order) {
    res.status(404).json({
    success : false,
    message : "Bad Request",
    order
   })
   }

   res.status(200).json({
    success : true,
    message : "Order Created Successfully...",
    order
   })
}