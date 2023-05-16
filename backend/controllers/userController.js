const userModel = require("../models/userModel")
const {generateToken} = require('../utils/generateToken')

const createUser = async(req,res) =>{
  let {name,email,password} = req.body
  let user = new userModel({name,email,password})
  let newUser = await user.save()
  res.status(201).json({
    name,
    email,
    password:newUser.password,
    _id:newUser._id,
    token:generateToken(newUser._id)
  })
}

module.exports = {createUser}