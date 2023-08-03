const express = require('express')
const router = express.Router()
const { isAdmin } = require('../middleware/isAdminMiddleware')
const { registerProduct, getProductData, getProductDataById, deleteProduct } = require('../controllers/productsControllers')

//rutas publicas
router.post('/', isAdmin, registerProduct)
router.get('/', getProductData)
router.get('/:id', getProductDataById )
router.delete('/:id', deleteProduct)

module.exports = router