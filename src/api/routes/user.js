const { isadmin } = require('../../middleware/isadmin')
const { isauth } = require('../../middleware/isauth')
const {
  getusers,
  registeruser,
  login,
  getcocineros,
  getcamareros,
  createstaff,
  updatestaffrole,
  deleteuser
} = require('../controlles/user')

const Userrouter = require('express').Router()
Userrouter.get('/', [isauth], getusers)
Userrouter.get('/cocinero', [isauth], getcocineros)
Userrouter.get('/camarero', [isauth], getcamareros)
Userrouter.post('/staff', createstaff)
Userrouter.post('/', registeruser)
Userrouter.post('/login', login)
Userrouter.put('/:id', [isadmin], updatestaffrole)
Userrouter.delete('/:id', [isauth], deleteuser)
module.exports = Userrouter
