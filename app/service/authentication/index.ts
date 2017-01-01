const authentication = require('feathers-authentication')
const jwt = require('feathers-authentication-jwt')
const local = require('feathers-authentication-local')
import hooks from './hooks'



export default function() {
  const app = this

  let config = app.get('auth')

  app.configure(authentication(config))
    .configure(jwt())
    .configure(local())

  app.service('authentication').before(hooks.before)
}
