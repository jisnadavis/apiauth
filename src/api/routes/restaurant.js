const { getrestaurant, postrestaurant } = require('../controlles/restaurant')

const Resstaurantrouter = require('express').Router()
Resstaurantrouter.get('/', getrestaurant)
Resstaurantrouter.post('/', postrestaurant)
module.exports = Resstaurantrouter
