const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const isLogged = async(req,res,next) =>{
  if(!req.headers.authorization){
    return res.status(401).send('No token on request')
  }
  let [bearer,token] = req.headers.authorization.split(' ')
  if(bearer!="Bearer"){
    return res.status(401).send('No bearer token')
  }
  let SECRET = process.env.SECRET
  let id_decoded
  try{
    id_decoded = jwt.verify(token,SECRET).id
  }catch{
    return res.status(401).send('No valid token')
  }
  let user = await userModel.findById(id_decoded)
  if(!user){
    return res.status(401).send('User no longer valid')
  }
  req.user = user
  next()
}

const isAdmin = (req,res,next) =>{
  isLogged(req,res,(error)=>{
    if(error){
      return next(error)
    }
    let user = req.user
    if(!user.isAdmin){
      return res.status(403).send('User is not admin')
    }
    next()
  })
}

module.exports = {isLogged,isAdmin}