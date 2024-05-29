const { generatesign } = require('../../utils/jwt')
const User = require('../modelos/user')
const bcrypt = require('bcrypt')

const getusers = async (req, res, next) => {
  try {
    const user = await User.find().select('-password')
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).json('error')
  }
}
const getcocineros = async (req, res, next) => {
  try {
    const cocinero = await User.find({ role: 'cocinero' }).select('-password')
    return res.status(200).json(cocinero)
  } catch (error) {
    console.log(error)
    return res.status(400).json('no puede mostrar cocinero')
  }
}
const getcamareros = async (req, res, next) => {
  try {
    const camareo = await User.find({ role: 'camarero' }).select('-password')
    return res.status(200).json(camareo)
  } catch (error) {
    console.log(error)
    return res.status(400).json('no puede mostrar camarero')
  }
}
const registeruser = async (req, res, next) => {
  try {
    const newuser = new User(req.body)
    const userexsist = await User.findOne({ email: newuser.email })
    if (userexsist) {
      return res.status(400).json('the user is already exisst')
    }

    const saveuser = await newuser.save()
    return res.status(201).json(saveuser)
  } catch (error) {
    console.log(error)
    return res.status(400).json('cant register user')
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'email or password is incorrect' })
    }
    const ispasswordvalid = bcrypt.compareSync(password, user.password)
    if (!ispasswordvalid) {
      return res.status(400).json({ message: 'email or password is invalid' })
    }
    if (ispasswordvalid) {
      const token = generatesign(user._id)
      console.log(token)
      return res.status(200).json({ token, user })
    }
  } catch (error) {
    console.error('Error occurred:', error)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}
const createstaff = async (req, res, next) => {
  try {
    const newuser = new User(req.body)
    if (newuser.role !== 'rest') {
      return res
        .status(400)
        .json(
          'role of user can only rest when you creating and admin will put appropriate role for you'
        )
    }
    const usersaved = await newuser.save()
    return res.status(200).json(usersaved)
  } catch (error) {
    console.log(error)
    return res.status(400).json('no puedo crear los usario')
  }
}
const updatestaffrole = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body
    if (!['admin', 'jefe', 'camarero', 'cocinero'].includes(role)) {
      return res.status(400).json('Invalid role')
    }
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    )

    if (!user) {
      return res.status(404).json('User not found')
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error')
  }
}
const deleteuser = async (req, res) => {
  try {
    const { id } = req.params
    const requestingUser = req.user
    const userToDelete = await User.findById(id)
    if (!userToDelete) {
      return res.status(404).json('User not found')
    }
    if (
      requestingUser.role !== 'admin' &&
      requestingUser._id.toString() !== id
    ) {
      return res.status(403).json('Access denied')
    }

    await User.findByIdAndDelete(id)

    return res
      .status(200)
      .json({ message: 'User deleted successfully', element: userToDelete })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Internal server error')
  }
}

module.exports = {
  getusers,
  registeruser,
  login,
  getcocineros,
  getcamareros,
  createstaff,
  updatestaffrole,
  deleteuser
}
