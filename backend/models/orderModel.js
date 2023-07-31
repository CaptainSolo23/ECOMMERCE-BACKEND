const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  totalAmount: {
    type: Number,
    required: true
  },

  /**
   * products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ]
   DEFINIENDO EL SCHEMA DENTRO DEL SCHEMA */
  
  products: [ // CON REFERENCIAS! ;)
    {
      type: mongoose.Schema.Types.ObjectId, // Referencia al esquema de producto
      ref: 'Product'
    }
  ]
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
