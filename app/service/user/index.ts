import * as path from 'path'
import * as mongoose from 'mongoose'
const service = require('feathers-mongoose')
import UserModel from '../../models/user'
import hooks from './hooks'



export default function() {
  const app = this

  let options = {
    Model: UserModel,
    paginate: {
      default: 5,
      max: 25
    }
  }

  // Initialize 'users' service
  app.use('/users', service(options))

  // Get 'users' service to build hooks
  const userService = app.service('users')

  // Set up our before hooks
  userService.before(hooks.before)

  // Set up our after hooks
  userService.after(hooks.after)

 }
