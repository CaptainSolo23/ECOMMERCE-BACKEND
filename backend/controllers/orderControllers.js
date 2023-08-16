const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

const setOrder = asyncHandler(async (req, res) => {
  // Desestructurar req.body
  const { products } = req.body;

  // Obtener user
  const { _id, name } = req.user;

  if (!_id || !name || !products || products.length === 0) { // Agregar una condición adicional para verificar si el array de productos no está vacío
    res.status(400);
    throw new Error('Incomplete Data');
  }

  // Crear la orden (Order) en la base de datos
  const order = await Order.create({
    user: _id, // Asignar el _id del usuario a la propiedad user de la orden
    products: products// Asignar el array de productos al campo products de la orden
  });

  if (order) {
    res.status(201).json({
      _id: order._id, // Devolver el _id de la orden creada
      user: name, // Devolver el nombre del usuario
      products: products // Devolver el array de productos de la orden (se podría omitir si ya lo tienes en req.body)
    });
  } else {
    res.status(400);
    throw new Error('An error occurred');
  }
})


const getOrders = asyncHandler (async (req,res) => {
    
  const orders = await Order.find({user: req.user._id})

  res.status(200).json({orders})

})

const deleteOrders = asyncHandler(async (req,res) => {
  const order = await Order.findById(req.params.id)
  if(!order){
      res.status(400)
      throw new Error('Order not found')
  } else{
      order.deleteOne()
  // const productDeleted = await Product.findByIdAndDelete(req.params.id)
  res.status(200).json({ message: `Order deleted with id: ${req.params.id}`})
  }
})

module.exports = {
  setOrder,
  getOrders
}
