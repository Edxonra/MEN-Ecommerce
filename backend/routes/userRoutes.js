const express = require('express')
const router = express.Router()

const {validateCreateUser,validateUpdateUser,validateUpdateProfile,validateLogUser} = require('../middlewares/userMiddleware')
const {isLogged,isAdmin} = require('../middlewares/accessMiddleware')
const {createUser,readUsers,readUser,readProfile,updateUser,updateProfile,deleteUser,logUser} = require('../controllers/userController')

router.route('/').post(validateCreateUser,createUser).get(isAdmin,readUsers)
router.route('/profile').get(isLogged,readProfile).put(isLogged,validateUpdateProfile,updateProfile)
router.route('/login').post(validateLogUser,logUser)
router.route('/:id').get(isAdmin,readUser).put(isAdmin,validateUpdateUser,updateUser)
  .delete(isAdmin,deleteUser)

module.exports = router