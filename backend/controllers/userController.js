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

const readUsers = async(req,res) =>{
  let users = await userModel.find().select('-password')
  res.json(users)
}

const readUser = async(req,res) =>{
  let id = req.params.id
  let user
  try{
    user = await userModel.findById(id).select('-password')
    if(!user){
      throw new Error();
    }
  }catch{
    return res.status(404).send('User not found')
  }
  res.json(user)
}

const readProfile = (req,res) =>{
  return res.json(req.user)
}

const updateUser = async(req,res) =>{
  let id = req.params.id
  let user
  try{
    user = await userModel.findById(id).select('-password')
    if(!user){
      throw new Error();
    }
  }catch{
    return res.status(404).send('User not found')
  }
  let isAdmin = req.body.isAdmin
  user.isAdmin = isAdmin
  user.save()
  res.json(user)
}

const updateProfile = (req,res) =>{
  let user = req.user
  let {name,password} = req.body
  user.name = name
  user.password = password
  user.save()
  res.json(user)
}

const deleteUser = async(req,res) =>{
  let id = req.params.id
  try{
    let deletedUser = await userModel.findByIdAndDelete(id)
    if(!deletedUser){
      throw new Error();
    }
  }catch{
    return res.send('User not found')
  }
  res.send('User deleted')
}

const logUser = async(req,res) =>{
  let {email,password} = req.body
  let user = await userModel.findOne({email})
  let matchesPassword = await user.comparePassword(password)
  if(!matchesPassword){
    return res.send('Wrong password')
  }
  res.json(user)
}

module.exports = {createUser,readUsers,readUser,readProfile,updateUser,updateProfile,deleteUser,logUser}