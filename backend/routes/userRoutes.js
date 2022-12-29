import express  from 'express'
const router = express.Router()
import {loginUser, registerUser, getUserProfile, updateUserProfile} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'

//desc register user
//route /api/users
//acess public
router.route('/').post(registerUser)

//desc login user
//route /api/users/login
//acess public
router.route('/login').post(loginUser)

//desc get user profile
//route /api/users/profile
//acess private
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router