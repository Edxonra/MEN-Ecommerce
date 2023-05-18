const userModel = require('../models/userModel')

const validateCreateUser = async(req,res,next) =>{
  let user = req.body
  let hasEmptyFields = validateEmptyFieldsForCreateUser(user)
  if(hasEmptyFields){
    return res.send('Empty fields')
  }
  let isEmailValid = validateEmail(user.email)
  if(!isEmailValid){
    return res.send('Invalid email')
  }
  let isEmailInUse = await validateEmailInUse(user.email)
  if(isEmailInUse){
    //return res.send('Email is already in use')
  }
  let isPasswordStrong = validatePassword(user.password)
  if(!isPasswordStrong){
    return res.send('Password is too weak')
  }
  next()
}

const validateEmptyFieldsForCreateUser = (user) =>{
  let {name,email,password} = user
  return typeof name!='string'||name==""||typeof email!='string'||email==""||typeof password!='string'||password==""
  
}

const validateEmail = (email) =>{
  const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/
  return emailRegex.test(email);
}

const validateEmailInUse = (email) =>{
  let user = userModel.findOne({email})
  return user
}

const validatePassword = (password) =>{
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

const validateUpdateUser = (req,res,next) =>{
  let isAdmin = req.body.isAdmin
  let hasEmptyFields = validateEmptyFieldsForUpdateUser(isAdmin)
  if(hasEmptyFields){
    return res.send('Empty fields')
  }
  next()
}

const validateEmptyFieldsForUpdateUser = (isAdmin) =>{
  return typeof isAdmin != 'boolean';
}

const validateUpdateProfile = (req,res,next) =>{
  let user = req.body
  let hasEmptyFields = validateEmptyFieldsForUpdateProfile(user)
  if(hasEmptyFields){
    return res.send('Empty fields')
  }
  let isPasswordStrong = validatePassword(user.password)
  if(!isPasswordStrong){
    return res.send('Password is too weak')
  }
  next()
}

const validateEmptyFieldsForUpdateProfile = (user) =>{
  let {name,password} = user
  return typeof name!='string'||name==""||typeof password!='string'||password==""
}

const validateLogUser = async(req,res,next) =>{
  let user = req.body
  let hasEmptyFields = validateEmptyFieldsForLogUser(user)
  if(hasEmptyFields){
    return res.send('Empty fields')
  }
  let isEmailValid = validateEmail(user.email)
  if(!isEmailValid){
    return res.send('Invalid email')
  }
  let isEmailRegistered = await validateEmailInUse(user.email)
  if(!isEmailRegistered){
    return res.send('Email is not registered')
  }
  let isPasswordStrong = validatePassword(user.password)
  if(!isPasswordStrong){
    return res.send('Password is too weak')
  }
  next()
}

const validateEmptyFieldsForLogUser = (user) =>{
  let {email,password} = user
  return typeof email!='string'||email==""||typeof password!='string'||password==""
}

module.exports = {validateCreateUser,validateUpdateUser,validateUpdateProfile,validateLogUser}