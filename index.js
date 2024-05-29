const express = require('express')
const { connectdb } = require('./src/config/db')
const Userrouter = require('./src/api/routes/user')
const Resstaurantrouter = require('./src/api/routes/restaurant')
const Reservationrouter = require('./src/api/routes/reservation')
require('dotenv').config()
const app = express()
connectdb()
app.use(express.json())
app.use('/api/v1/users', Userrouter)
app.use('/api/v1/restaurants', Resstaurantrouter)
app.use('/api/v1/reservation', Reservationrouter)
app.listen(3001, () => {
  console.log('http://localhost:3001')
})