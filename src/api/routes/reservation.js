const { getreservation } = require('../controlles/reservation')

const Reservationrouter = require('express').Router()
Reservationrouter.get('/', getreservation)
module.exports = Reservationrouter
