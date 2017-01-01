const auth = require('feathers-authentication')

const before = {
  create: [
    auth.hooks.authenticate(['jwt', 'local'])
  ],
}

export default {
  before
}
