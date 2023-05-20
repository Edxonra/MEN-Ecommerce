const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items:[{
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product'
    },
    qty:{
      type:Number
    }
  }],
  price:Number,
  taxPrice:Number,
  shippingPrice:Number,
  totalPrice:Number,
  isPaid:{
    type:Boolean,
    default:false
  },
  isDelivered:{
    type:Boolean,
    default:false
  },
  isCanceled:{
    type:Boolean,
    default:false
  },
})

module.exports = Order = mongoose.model('Order',orderSchema)