const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')



/**
 * 
 * AQUI VAN LOS CONTROLADORES 
 * 
 */

module.exports = {
    registerUser,
    loginUser,
    getUserData
}