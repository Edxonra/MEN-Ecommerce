const express = require('express')
const router = express.Router()

//const {} = require('../middlewares/orderMiddleware')
const {isLogged,isAdmin} = require('../middlewares/accessMiddleware')
const {createOrder,readOrders,readOrder,readMyOrders,updateOrderPay,updateOrderDeliver,updateOrderCanceled,
  deleteOrder} = require('../controllers/orderController')

/**
 * CRUD
 * Create order
 * Read orders
 * Read order
 * Read my orders
 * Update order pay
 * Update order delivered
 * Update order canceled
 * Delete order
 */

router.route('/').post(isLogged,createOrder)


module.exports = router