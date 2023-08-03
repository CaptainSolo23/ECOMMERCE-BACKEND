const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  
  customerName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  
  products: [ // CON REFERENCIAS! ;)
    {
      type: mongoose.Schema.Types.ObjectId, // Referencia al esquema de producto
      ref: 'Product'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);