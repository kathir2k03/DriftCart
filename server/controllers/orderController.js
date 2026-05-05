const Order = require('../models/orderModel')
const Product = require('../models/productModel')

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

//admin : update order (order status, product quantity or stock and deliver at) - api/v1/order/:id

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found"
    });
  }

  if (order.orderStatus === 'Delivered') {
    return res.status(400).json({
      success: false,
      message: 'Order has been already delivered!'
    });
  }


  for (const item of order.orderItems) {
    await updateStock(item.product, item.quantity);
  }

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true
  });
};

const updateStock = async (productId, quantity) => {
  if (!productId) {
    console.log("productId is missing:", productId);
    return;
  }

  const product = await Product.findById(productId);

  if (!product) {
    console.log("Product not found in DB:", productId);
    return;
  }

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
};

// Admin Delete Order - api/v1/order/:id

exports.deleteOrder = async (req, res, next) =>{
   const order = await Order.findById(req.params.id)

   if (!order) {
    return res.status(400).json({
       success : false,
       message : "Request ID is not valid"
    })
   }

   await order.deleteOne()

  return res.status(200).json({
    success : true,
    message  : "The Order has been deleted"
   })
}