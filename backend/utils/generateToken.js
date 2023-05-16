const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
  let SECRET = process.env.SECRET
  let token = jwt.sign({id},SECRET)
  return token
}

module.exports = {generateToken}