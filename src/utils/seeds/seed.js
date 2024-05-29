const mongoose = require('mongoose')
const User = require('../../api/modelos/user')

const users = [
  {
    nombre: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'admin'
  },
  {
    nombre: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'jefe'
  },
  {
    nombre: 'Carlos Martinez',
    email: 'carlos@example.com',
    password: 'password123',
    role: 'camarero'
  },
  {
    nombre: 'Maria Rodriguez',
    email: 'maria@example.com',
    password: 'password123',
    role: 'cocinero'
  },
  {
    nombre: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
    role: 'camarero'
  },
  {
    nombre: 'Bob Brown',
    email: 'bob@example.com',
    password: 'password123',
    role: 'cocinero'
  },
  {
    nombre: 'Charlie Green',
    email: 'charlie@example.com',
    password: 'password123',
    role: 'jefe'
  },
  {
    nombre: 'Daniel White',
    email: 'daniel@example.com',
    password: 'password123',
    role: 'camarero'
  },
  {
    nombre: 'Eva Black',
    email: 'eva@example.com',
    password: 'password123',
    role: 'cocinero'
  },
  {
    nombre: 'Frank Gray',
    email: 'frank@example.com',
    password: 'password123',
    role: 'camarero'
  }
]

const runSeed = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://jisnadavis93:uuDrr0Z7lPZV7R0R@cluster0.bnlhpar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    await User.deleteMany({})
    console.log('Existing users deleted')

    // Insert users and ensure pre-save middleware is triggered
    for (const userData of users) {
      const user = new User(userData)
      await user.save()
    }
    console.log('Users inserted')
    await mongoose.disconnect()
  } catch (error) {
    console.error(error)
  }
}

runSeed()
