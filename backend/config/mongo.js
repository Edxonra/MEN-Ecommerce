const mongoose = require('mongoose');

const connect = () =>{
  const MONGO_URI = process.env.MONGO_URI
  mongoose.connect(MONGO_URI)
  .then(()=>{
    console.log("Connected to MongoDB")
  })
  .catch((err)=>{
    console.error('Failed to connect to the database:', err);
  })
}

module.exports = {connect}