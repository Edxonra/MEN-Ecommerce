const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  isAdmin:{
    type:Boolean,
    default:false
  },
  password:String
})

userSchema.pre('save',async function(next){
  const user = this
  if(!user.isModified('password')){
    return next()
  }
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(user.password,salt)
  user.password = hashedPassword
  next()
})

module.exports = User = mongoose.model('User',userSchema)