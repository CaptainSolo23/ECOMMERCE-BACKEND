const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')


const registerUser = asyncHandler ( async (req,res) => {
    //desestructuramos el req.body
    const { name, email, password, role } = req.body
    //verificar que nos pasen todos los datos requeridos
    if(!name || !email || !password ||!role){
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
    }

    //verificar que ese usuario no existe
const userExists = await User.findOne({email})
if(userExists){
    res.status(400)
        throw new Error('Ese user ya existe')
}

//hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //crear el user
    const user = await User.create({
        name, 
        email,
        password: hashedPassword,
        role
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            role: user.role
        })
    }else{
        res.status(400)
        throw new Error('No se pudo guardar el registro')
    }
})



const loginUser = asyncHandler (async (req,res) => {

    //desestructurar los datos del req.body
    const { email,password } = req.body

    //verificar que nos pasen todos los datos requeridos
    if(!email || !password){
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
    }

    //buscar que el usuario exista
    const user = await User.findOne({email})

    //verificar el password
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Datos de acceso incorrectos')
    }
    res.json({message: 'Login User'})
})

const getUserData = asyncHandler(async(req,res) => {
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30m'})
}

module.exports = {
    registerUser,
    loginUser,
    getUserData
}