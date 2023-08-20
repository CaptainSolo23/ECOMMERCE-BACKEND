const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5001
const cors = require('cors')


connectDB()

const corsOptions = {
    origin: ['https://creepy-cow-bikini.cyclic.app'], // Add more origins as needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // This allows sending cookies and headers along with the request
  };

const app = express()
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/products', require('./routes/productsRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/order', require('./routes/ordersRoutes'))
app.use('/api/tareas', require('./routes/tareasRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))