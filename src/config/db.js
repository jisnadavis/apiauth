const mongoose = require('mongoose')
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('connectado con exito ')
  } catch (error) {
    console.log('not able to connect with server')
  }
}
module.exports = { connectdb }
