const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    default:"Sample name"
  },
  image:{
    type:String,
    default:"sample_image.jpg"
  },
  brand:{
    type:String,
    default:"Sample brand"
  },
  price:{
    type:Number,
    default:0
  },
  qty:{
    type:Number,
    default:0
  }
})

module.exports = Product = mongoose.model('Product',productSchema)