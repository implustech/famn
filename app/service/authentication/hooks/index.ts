const auth = require('feathers-authentication')

const before = {
  create: [
    auth.hooks.authenticate(['jwt', 'local'])
  ],
  remove: [
    auth.hooks.authenticate('jwt')
  ]
}

export default {
  before
}
