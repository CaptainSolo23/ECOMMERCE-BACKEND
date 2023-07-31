const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

//rutas publicas
router.post('/', registerUser)
router.post('/login', loginUser)

module.exports = router