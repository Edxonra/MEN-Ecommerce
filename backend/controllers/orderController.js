const orderModel = require("../models/orderModel")

const createOrder = async(req,res) =>{
  let {user,items,price,taxPrice,shippingPrice,totalPrice} = req.body
  let newOrder
  try{
    newOrder = await orderModel.create({user,items,price,taxPrice,shippingPrice,totalPrice})
  }catch{
    return res.send('Invalid data')
  }
  res.status(201).json(newOrder)
}

const readOrders = async(req,res) =>{
  let orders = await orderModel.find()
  res.json(orders)
}

const readOrder = async(req,res) =>{
  let id = req.params.id
  let order
  try{
    order = await orderModel.findById(id)
    if(!order){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Order not found')
  }
  res.json(order)
}

const readMyOrders = async(req,res) =>{
  let orders = await orderModel.find({user:req.user})
  res.json(orders)
}

const updateOrderPay = async(req,res) =>{
  let id = req.params.id
  let order
  try{
    order = await orderModel.findById(id)
    if(!order){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Order not found')
  }
  if(order.isPaid){
    return res.send('Order already paid')
  }
  order.isPaid = true
  res.json(order)
}

const updateOrderDeliver = async(req,res) =>{
  let id = req.params.id
  let order
  try{
    order = await orderModel.findById(id)
    if(!order){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Order not found')
  }
  if(!order.isPaid){
    return res.send('Order not paid')
  }
  if(order.isDelivered){
    return res.send('Order already delivered')
  }
  order.isDelivered = true
  res.json(order)
}

const updateOrderCancel = async(req,res) =>{
  let id = req.params.id
  let order
  try{
    order = await orderModel.findById(id)
    if(!order){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Order not found')
  }
  if(order.isPaid){
    return res.send('Order is paid')
  }
  if(order.isDelivered){
    return res.send('Order is delivered')
  }
  order.isCanceled = true
  res.json(order)
}

const deleteOrder = async(req,res) =>{
  let id = req.params.id
  console.log(id)
  try{
    let deletedOrder = await orderModel.findByIdAndDelete(id)
    if(!deletedOrder){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Order not found')
  }
  res.send('Order deleted')
}


module.exports = {createOrder,readOrders,readOrder,readMyOrders,updateOrderPay,updateOrderDeliver,
  updateOrderCancel,deleteOrder}