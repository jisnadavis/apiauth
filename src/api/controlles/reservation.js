const Reservation = require('../modelos/reservation')
const Restaurant = require('../modelos/restaurant')
const mongoose = require('mongoose')

const getReser = async (req, res) => {
  try {
    console.log(`Request params: ${JSON.stringify(req.params)}`)
    const { restaurant_id } = req.params
    const requestinguser = req.user._id // Assuming user ID is stored in req.user

    // Log the received restaurant ID for debugging
    console.log(`Received restaurant_id: ${restaurant_id}`)

    if (!mongoose.Types.ObjectId.isValid(restaurant_id)) {
      console.log(`Invalid restaurant_id: ${restaurant_id}`) // Log invalid ID
      return res.status(400).json('Invalid restaurant ID')
    }

    const reservedrest = await Restaurant.findById(restaurant_id)

    if (!reservedrest) {
      console.log(`Restaurant not found for ID: ${restaurant_id}`) // Log not found
      return res.status(404).json('Restaurant not found')
    }

    // Check if the requesting user is a staff member of the restaurant
    if (!reservedrest.staffs.includes(requestinguser)) {
      return res.status(403).json('You are not staff of the restaurant')
    }

    // Fetch reservations for the specified restaurant
    const reservations = await Reservation.find({ restaurant: restaurant_id })

    return res.status(200).json(reservations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = { getReser }
