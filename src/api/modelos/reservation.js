const mongoose = require('mongoose')
const reservationschema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    restaurant: { type: mongoose.Types.ObjectId, ref: 'restaurants' },
    number_guests: { type: Number, required: true }
  },
  { timeseries: true }
)
const Reservation = mongoose.model(
  'reservations',
  reservationschema,
  'reservations'
)
module.exports = Reservation
