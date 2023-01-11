import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const registerUser = asyncHandler(async (req, res) => {
    const {email, name, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    //check user if exists
    const exist = await User.findOne({email})
    if(exist){
        res.status(400)
        throw new Error('User already exist!')
    }

    //create User
    const user = await User.create({
        name, 
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    //check user and match password
    if(user && await user.matchPassword(password)){
        res.status(200).json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Credentials!')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name, 
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found!')
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    if(users){
        res.status(200).json(users)
    } else {
        res.status(404)
        throw new Error('Users not found')
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name, 
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('User Not Found!')
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(user){
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('Users not found')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name, 
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('User Not Found!')
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.status(200).json({message: "user removed"})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export {
    registerUser, 
    loginUser,
    getUserProfile,
    getAllUsers,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUser
}