const express = require('express')
const router = express.Router()

const {validateCreateOrder} = require('../middlewares/orderMiddleware')
const {isLogged,isAdmin} = require('../middlewares/accessMiddleware')
const {createOrder,readOrders,readOrder,readMyOrders,updateOrderPay,updateOrderDeliver,updateOrderCancel,
  deleteOrder} = require('../controllers/orderController')

router.route('/').post(isLogged,validateCreateOrder,createOrder).get(isAdmin,readOrders)
router.route('/my').get(isLogged,readMyOrders)
router.route('/:id').get(isLogged,readOrder).delete(isAdmin,deleteOrder)
router.route('/:id/pay').put(isLogged,updateOrderPay)
router.route('/:id/deliver').put(isAdmin,updateOrderDeliver)
router.route('/:id/cancel').put(isAdmin,updateOrderCancel)

module.exports = router