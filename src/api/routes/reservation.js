const { isauth } = require('../../middleware/isauth')
const { getreservation } = require('../controlles/reservation')

const Reservationrouter = require('express').Router()
Reservationrouter.get('/', [isauth], getreservation)
module.exports = Reservationrouter
