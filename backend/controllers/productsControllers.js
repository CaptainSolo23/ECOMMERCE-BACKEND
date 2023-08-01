const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')


const registerProduct = asyncHandler ( async (req,res) => {
    //desestructuramos el req.body
    const { name, price, description, category } = req.body
    //verificar que nos pasen todos los datos requeridos
    if(!name || !price || !description || !category){
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
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
/**
 * 
 * AQUI VAN LOS CONTROLADORES 
 * 
 */

module.exports = {
    registerProduct,
    getProductData,
    getProductDataById
}