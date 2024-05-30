const { isauth } = require('../../middleware/isauth')
const { isStaff } = require('../../middleware/isstaff')
const {
  getReser,
  postreservation,
  updatereservation,
  deletereservation
} = require('../controlles/reservation')

const Reservationrouter = require('express').Router()
Reservationrouter.get('/:restaurant_id', [isauth], getReser)
Reservationrouter.post('/', [isauth], postreservation)
Reservationrouter.put('/:reservation_id', [isauth], updatereservation)
Reservationrouter.delete('/:reservation_id', [isauth], deletereservation)
module.exports = Reservationrouter
