const Reservation = require('../modelos/reservation')
const Restaurant = require('../modelos/restaurant')
const mongoose = require('mongoose')

const getReser = async (req, res) => {
  try {
    console.log(`Request params: ${JSON.stringify(req.params)}`)
    const { restaurant_id } = req.params
    const requestinguser = req.user._id
    console.log(`Received restaurant_id: ${restaurant_id}`)
    if (!mongoose.Types.ObjectId.isValid(restaurant_id)) {
      console.log(`Invalid restaurant_id: ${restaurant_id}`)
      return res.status(400).json('Invalid restaurant ID')
    }
    const reservedrest = await Restaurant.findById(restaurant_id)
    if (!reservedrest) {
      console.log(`Restaurant not found for ID: ${restaurant_id}`)
      return res.status(404).json('Restaurant not found')
    }
    if (!reservedrest.staffs.includes(requestinguser)) {
      return res.status(403).json('You are not staff of the restaurant')
    }

    const reservations = await Reservation.find({
      restaurant: restaurant_id
    }).populate('restaurant')

    return res.status(200).json(reservations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const postreservation = async (req, res, next) => {
  try {
    const newreservation = new Reservation(req.body)

    const reservationsaved = await newreservation.save()

    return res.status(201).json(reservationsaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json('can not post reservation')
  }
}
const updatereservation = async (req, res, next) => {
  try {
    const { reservation_id } = req.params
    const requestinguser = req.user
    const findreservation = await Reservation.findById(reservation_id)
    if (!findreservation) {
      return res.status(400).json('Reservation not found')
    }
    const findrestaurant = await Restaurant.findById(findreservation.restaurant)

    const staffid = findrestaurant.staffs

    if (findreservation.restaurant && staffid.includes(requestinguser.id)) {
      const newreservation = req.body
      const reservationUpdated = await Reservation.findByIdAndUpdate(
        reservation_id,
        newreservation,
        { new: true }
      )

      return res.status(200).json(reservationUpdated)
    } else {
      return res
        .status(403)
        .json('User not authorized to update this reservation')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json('Cannot update the reservation')
  }
}
const deletereservation = async (req, res, next) => {
  try {
    const { reservation_id } = req.params
    const requestinguser = req.user
    const findreservation = await Reservation.findById(reservation_id)
    if (!findreservation) {
      return res.status(400).json('Reservation not found')
    }
    const findrestaurant = await Restaurant.findById(findreservation.restaurant)

    const staffid = findrestaurant.staffs

    if (findreservation.restaurant && staffid.includes(requestinguser.id)) {
      const reservationdeleted = await Reservation.findByIdAndDelete(
        reservation_id
      )
      return res.status(200).json({
        message: 'the reservation is deleted',
        element: reservationdeleted
      })
    } else {
      return res
        .status(403)
        .json('User not authorized to delete this reservation')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json('Cannot delete the reservation')
  }
}
module.exports = {
  getReser,
  postreservation,
  updatereservation,
  deletereservation
}
