const express = require('express')
const router = express.Router()

const {validateUpdateProduct} = require('../middlewares/productMiddleware')
const {isAdmin} = require('../middlewares/accessMiddleware')
const {createProduct,readProducts,readProduct,updateProduct,deleteProduct} = require('../controllers/productController')

router.route('/').post(isAdmin,createProduct).get(readProducts)
router.route('/:id').get(readProduct).put(isAdmin,validateUpdateProduct,updateProduct).delete(isAdmin,deleteProduct)

module.exports = router