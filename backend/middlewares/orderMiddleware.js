const validateCreateOrder = (req,res,next) =>{
  let order = req.body
  let hasEmptyFields = validateEmptyFields(order)
  if(hasEmptyFields){
    return res.send('Empty fields')
  }
  next()
}

const validateEmptyFields = (order) =>{
  let {user,items,price,taxPrice,shippingPrice,totalPrice} = order
  return typeof user!='string'||user==""||typeof items!="object"||items.length==0||typeof price!="number"||typeof taxPrice!="number"||typeof shippingPrice!="number"||typeof totalPrice!="number"
}

module.exports = {validateCreateOrder}