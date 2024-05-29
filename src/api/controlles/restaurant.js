const Restaurant = require('../modelos/restaurant')
const User = require('../modelos/user')

const getrestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.find().populate({
      path: 'staffs',
      select: '-password -email '
    })

    return res.status(200).json(restaurant)
  } catch (error) {
    return res.status(400).json('cant acess resturant')
  }
}
const postrestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (user.role !== 'jefe') {
      return res.status(400).json('you are not the owner of the restaurant')
    }

    const restaurant = new Restaurant(req.body)
    const saverest = await restaurant.save()
    return res.status(201).json(saverest)
  } catch (error) {
    console.log(error)
    return res.status(400).json('error')
  }
}

const updaterestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const requestinguser = req.user
    const { name_restaurant, capacity, menu, staff } = req.body
    const restaurant = await Restaurant.findById(id)
    if (!restaurant) {
      return res.status(400).json('restaurant not found')
    }
    const isStaff = restaurant.staffs.some(
      (staff) => staff._id.toString() === requestinguser._id.toString()
    )
    if (
      !isStaff ||
      (requestinguser.role !== 'jefe' && requestinguser.role !== 'admin')
    ) {
      return res
        .status(403)
        .json(
          'Access denied: Only "jefe" or "admin" of this restaurant can update it'
        )
    }
    const updatefields = {}
    if (name_restaurant) updatefields.name_restaurant = name_restaurant
    if (capacity) updatefields.capacity = capacity
    if (menu) updatefields.menu = menu
    const updaterestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $set: updatefields },
      { new: true, runValidators: true }
    )
    if (staff && staff.length) {
      await Libro.findByIdAndUpdate(
        id,
        { $addToSet: { staff: { $each: staff } } },
        { new: true, runValidators: true }
      )
    }

    return res.status(200).json({
      message: 'restaurant updated successfully',
      element: updaterestaurant
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json('cant update resturant')
  }
}
const deletestaff = async (req, res, next) => {
  try {
    const { id_staff } = req.body
    const { id } = req.params
    const requestingUser = req.user

    const restaurant = await Restaurant.findById(id).populate('staffs')
    if (!restaurant) {
      return res.status(404).json('Restaurant not found')
    }

    const staffMember = restaurant.staffs.find(
      (staff) => staff._id.toString() === id_staff
    )
    if (!staffMember) {
      return res
        .status(400)
        .json('The staff member is not part of the restaurant')
    }

    const isStaff = restaurant.staffs.some(
      (staff) => staff._id.toString() === requestingUser._id.toString()
    )
    if (
      !isStaff ||
      (requestingUser.role !== 'jefe' && requestingUser.role !== 'admin')
    ) {
      return res
        .status(403)
        .json(
          'Access denied: Only "jefe" or "admin" of this restaurant can delete staff'
        )
    }
    restaurant.staffs = restaurant.staffs.filter(
      (staff) => staff._id.toString() !== id_staff
    )
    await restaurant.save()
    await User.findByIdAndDelete(id_staff)
    return res
      .status(200)
      .json({ message: 'Staff member deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error')
  }
}
const deleterestaurant = async (req, res, next) => {
  try {
    const { id } = req.params
    const requestingUser = req.user

    const restaurant = await Restaurant.findById(id)
    if (!restaurant) {
      return res.status(404).json('Restaurant not found')
    }

    const isStaff = restaurant.staffs.some(
      (staff) => staff._id.toString() === requestingUser._id.toString()
    )

    if (
      !isStaff ||
      (requestingUser.role !== 'jefe' && requestingUser.role !== 'admin')
    ) {
      return res
        .status(403)
        .json(
          'Access denied: Only "jefe" or "admin" of this restaurant can delete it'
        )
    }
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id)
    if (!deletedRestaurant) {
      return res.status(404).json('Restaurant not found')
    }

    return res.status(200).json({ message: 'Restaurant deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error')
  }
}

module.exports = {
  getrestaurant,
  postrestaurant,
  updaterestaurant,
  deletestaff,
  deleterestaurant
}
