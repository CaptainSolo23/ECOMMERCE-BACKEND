const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    texto: {
        type: String,
        required: [true, 'Porfavor teclea una descripcion del producto']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)