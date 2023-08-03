const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')


const registerProduct = asyncHandler ( async (req,res) => {
    //desestructuramos el req.body
    const { name, price, description, category } = req.body
    //desestructuramos el req.user
    const { role } = req.user

    if (role !== 'admin') {
        res.status(403);
        throw new Error('Authorization denied: not admin');
      }

    //verificar que nos pasen todos los datos requeridos
    if(!name || !price || !description || !category){
        res.status(400)
        throw new Error('Data incomplete')
    }

    //verificar que ese producto no existe
const productExists = await Product.findOne({name})
if(productExists){
    res.status(400)
        throw new Error('Ese producto ya existe')
}

//crear el producto
const product = await Product.create({
    name, 
    price,
    description,
    category
})

if(product){
    res.status(201).json({
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category
    })
}else{
    res.status(400)
    throw new Error('No se pudo guardar el registro')
}

})

const getProductData = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

const getProductDataById = asyncHandler(async(req,res) => {

    const productId = req.params.id

    try{
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({ error: 'Producto no encontrado'})
        }
        res.json(product)
    } catch{
        res.status(500)
        throw new Error('Error al obtener los datos del producto')
    }
    
})

const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(400)
        throw new Error('La tarea no existe')
    } else{
        product.deleteOne()
    // const productDeleted = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `Borraste el producto con id ${req.params.id}`})
    }
})
/**
 * 
 * AQUI VAN LOS CONTROLADORES 
 * 
 */

module.exports = {
    registerProduct,
    getProductData,
    getProductDataById,
    deleteProduct
}