const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Books', 'Other'],
        default: 'Other'
      }
    }, {
      timestamps: true
})

module.exports = mongoose.model('Product', productSchema)