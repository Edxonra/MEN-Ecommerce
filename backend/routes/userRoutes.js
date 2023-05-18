const express = require('express')
const router = express.Router()

const {validateCreateUser,validateUpdateUser,validateUpdateProfile,validateLogUser} = require('../middlewares/userMiddleware')
const {isLogged,isAdmin} = require('../middlewares/accessMiddleware')
const {createUser,readUsers,readUser,readProfile,updateUser,updateProfile,deleteUser,logUser} = require('../controllers/userController')

router.route('/').post(validateCreateUser,createUser).get(isLogged,isAdmin,readUsers)
router.route('/profile').get(isLogged,readProfile).put(isLogged,validateUpdateProfile,updateProfile)
router.route('/login').post(validateLogUser,logUser)
router.route('/:id').get(isLogged,isAdmin,readUser).put(isLogged,isAdmin,validateUpdateUser,updateUser)
  .delete(isLogged,isAdmin,deleteUser)

module.exports = router