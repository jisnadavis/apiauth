const mongoose = require('mongoose')
const restaurantschema = new mongoose.Schema(
  {
    name_restaurant: { type: String, required: true },
    capacity: { type: Number, required: true },
    menu: { type: String, required: true },
    staffs: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
  },
  { timeseries: true }
)
const Restaurant = mongoose.model(
  'restaurants',
  restaurantschema,
  'restaurants'
)
module.exports = Restaurant
