const Restaurant = require('../modelos/restaurant')

const getrestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.find().populate('staffs')
    return res.status(200).json(restaurant)
  } catch (error) {
    return res.status(400).json('cant acess users')
  }
}
const postrestaurant = async (req, res, next) => {
  try {
    const restaurant = new Restaurant(req.body)
    const saverest = await restaurant.save()
    return res.status(201).json(saverest)
  } catch (error) {
    return res.status(400).json('error')
  }
}
const updaterestaurant = async (req, res, next) => {}
module.exports = { getrestaurant, postrestaurant }
