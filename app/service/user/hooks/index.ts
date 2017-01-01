import * as globalHooks from '../../../hooks'
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication')
const local = require('feathers-authentication-local')


const myCustomQueryWithCurrentUser = function(options = {}) {
  return function(hook) {
    hook.params.query.userId = hook.params.user._id
    return Promise.resolve(hook)
  }
}

const before = {
  all: [],
  find: [
    auth.hooks.authenticate('jwt')
  ],
  get: [
    auth.hooks.authenticate('jwt')
  ],
  create: [
    local.hooks.hashPassword()
  ],
  update: [
    auth.hooks.authenticate('jwt'),
    local.hooks.hashPassword()
  ],
  patch: [
    auth.hooks.authenticate('jwt'),
    local.hooks.hashPassword()
  ],
  remove: [
    auth.hooks.authenticate('jwt'),
  ]
}

const after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

export default {
  before,
  after
}
