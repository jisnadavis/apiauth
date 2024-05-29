const { isauth } = require('../../middleware/isauth')
const { isStaff } = require('../../middleware/isstaff')
const { getReser } = require('../controlles/reservation')

const Reservationrouter = require('express').Router()
Reservationrouter.get('/:restaurant_id', [isauth], getReser)
module.exports = Reservationrouter
