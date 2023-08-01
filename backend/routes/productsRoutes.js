const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const { registerProduct, getProductData, getProductDataById } = require('../controllers/productsControllers')

//rutas publicas
router.post('/', registerProduct)
router.get('/', getProductData)
router.get('/:id', getProductDataById )

module.exports = router