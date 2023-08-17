const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5001
const cors = require('cors')


connectDB()

app.use(cors())
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/products', require('./routes/productsRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/order', require('./routes/ordersRoutes'))
app.use('/api/tareas', require('./routes/tareasRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))