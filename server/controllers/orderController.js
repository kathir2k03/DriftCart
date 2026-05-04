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

// Get Single Order -  api/v1/order/:id
exports.getSingleOrder = async (req, res, next) => {
   const order = await Order.findById(req.params.id).populate('user', 'name email')

   if(!order){
      return next(res.status(400).json({
         success : false,
         message : `The order not found with this id:${req.id}`
      }))
   }

   res.status(200).json({
      success : true,
      order
   })
}

//for admin - Get All Orders - api/v1/orders

exports.orders = async (req, res, next) => {

   const orders = await Order.find()
   let toatalPrice = 0
    
   orders.forEach((data) => {
    toatalPrice = toatalPrice += data.totalPrice
   })
   if(!orders) {
     return next(res.status(400).json({
         success : false,
         message : "No Orders Found"
      }))
   }

   res.status(200).json({
      success : true,
      toatalPrice,
      orders
   })
}