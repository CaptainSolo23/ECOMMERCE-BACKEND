const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { setOrder,getOrders } = require('../controllers/orderControllers')

//ruta protegida
router.post('/setOrder', protect, setOrder)
router.get('/getOrders', protect, getOrders)

module.exports = router