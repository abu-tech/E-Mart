import express  from 'express'
const router = express.Router()
import {loginUser, registerUser, getUserProfile, getAllUsers, updateUserProfile, deleteUser, getUserById, updateUser} from '../controllers/userController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

//desc register user
//route POST /api/users
//access public
router
    .route('/')
    .post(registerUser)
    .get(protect, isAdmin, getAllUsers)
    

//desc login user
//route POST /api/users/login
//access public
router
    .route('/login')
    .post(loginUser)

//desc get user profile
//route /api/users/profile
//access private
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router
    .route('/:id')
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)
    .delete(protect, isAdmin, deleteUser)

export default router