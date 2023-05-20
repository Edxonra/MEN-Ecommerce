const validateUpdateProduct = (req,res,next) =>{
  let product = req.body
  let hasEmptyFields = validateEmptyFields(product)
  if(hasEmptyFields){
    return res.send('Empty fields')
  }
  next()
}

const validateEmptyFields = (product) =>{
  let {name,image,brand,price,qty} = product
  return typeof name!='string'||name==""||typeof image!='string'||image==""||typeof brand!='string'||brand==""||typeof price!='number'||typeof qty!='number'
}

module.exports = {validateUpdateProduct}