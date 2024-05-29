const Reservation = require('../modelos/reservation')

const getreservation = async (req, res, next) => {
  try {
    const requestingUser = req.user
    const reservation = await Reservation.find().populate('restaurant')
    return res.status(200).json(reservation)
  } catch (error) {
    console.log(error)
    return res.status(400).json('error')
  }
}
module.exports = { getreservation }
