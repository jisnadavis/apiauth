const Restaurant = require('../api/modelos/restaurant')

const isStaff = async (req, res, next) => {
  try {
    const userId = req.user
    const restaurantId = req.params

    const restaurant = await Restaurant.findById(restaurantId)

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' })
    }

    const isStaff = restaurant.staffs.includes(userId)

    if (!isStaff) {
      return res.status(403).json({
        error: 'Access denied. You are not a staff member of this restaurant.'
      })
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
module.exports = { isStaff }
