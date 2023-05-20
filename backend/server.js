const express = require('express')
require('dotenv').config()
const {connect} = require('./config/mongo')

connect()

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()

app.use(express.json());

app.use('/users',userRoutes)
app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/uploads',uploadRoutes)

const PORT = process.env.PORT||3000

app.get('/', (req, res) => {
  res.send('Valid Endpoint')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
