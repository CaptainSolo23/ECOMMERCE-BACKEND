const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Porfavor teclea un nombre']
    },
    email:{
        type: String,
        required:[true, 'Porfavor ingresa tu email'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'Porfavor teclea un password']
    },
    role:{
        type: String,
        required: true
    }
    
},{
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)