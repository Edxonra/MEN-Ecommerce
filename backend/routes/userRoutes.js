const express = require('express')
const router = express.Router()

const {validateCreateUser} = require('../middlewares/userMiddleware')
const {createUser} = require('../controllers/userController')

router.route('/').post(validateCreateUser,createUser)

module.exports = router