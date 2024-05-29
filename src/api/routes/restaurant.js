const { isauth } = require('../../middleware/isauth')

const {
  getrestaurant,
  postrestaurant,
  updaterestaurant,
  deletestaff,
  deleterestaurant
} = require('../controlles/restaurant')
const Restaurant = require('../modelos/restaurant')

const Resstaurantrouter = require('express').Router()
Resstaurantrouter.get('/', getrestaurant)
Resstaurantrouter.post('/:id', [isauth], postrestaurant)
Resstaurantrouter.put('/:id', [isauth], updaterestaurant)
Resstaurantrouter.delete('/:id', [isauth], deletestaff)
Resstaurantrouter.delete('/:delete/:id', [isauth], deleterestaurant)
module.exports = Resstaurantrouter
