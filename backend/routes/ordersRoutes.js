const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { setOrder } = require('../controllers/orderControllers')

//ruta protegida
router.post('/order/setOrder', protect, setOrder)

module.exports = router