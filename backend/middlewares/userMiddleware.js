const userModel = require('../models/userModel')

const validateCreateUser = async(req,res,next) =>{
  let user = req.body
  let hasEmptyFields = validateEmptyFields(user)
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

const validateEmptyFields = (user) =>{
  let {name,email,password} = user
  return !name||!email||!password
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

module.exports = {validateCreateUser}