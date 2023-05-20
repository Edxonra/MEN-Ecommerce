const productModel = require("../models/productModel")

const createProduct = async(req,res) =>{
  let newProduct = await productModel.create({})
  res.status(201).json(newProduct)
}

const readProducts = async(req,res) =>{
  let products = await productModel.find()
  res.json(products)
}

const readProduct = async(req,res) =>{
  let id = req.params.id
  let product
  try{
    product = await productModel.findById(id)
    if(!product){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Product not found')
  }
  res.json(product)
}

const updateProduct = async(req,res) =>{
  let id = req.params.id
  let product
  try{
    product = await productModel.findById(id)
    if(!product){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Product not found')
  }
  let {name,brand,price,qty} = req.body
  product.name = name
  product.brand = brand
  product.price = price
  product.qty = qty
  res.json(product)
}

const deleteProduct = async(req,res) =>{
  let id = req.params.id
  try{
    let deletedProduct = await productModel.findByIdAndDelete(id)
    if(!deletedProduct){
      throw new Error();
    }
  }catch{
    return res.status(404).send('Product not found')
  }
  res.send('Product deleted')
}

module.exports = {createProduct,readProducts,readProduct,updateProduct,deleteProduct}