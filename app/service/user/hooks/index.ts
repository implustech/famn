import * as globalHooks from '../../../hooks'
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication')
const local = require('feathers-authentication-local')
const permissions = require('feathers-permissions')

const adminPermission = permissions.hooks.checkPermissions({
  roles: ['ADMIN'],
  on: 'user',
  field: 'roles'
})

const before = {
  all: [
  ],
  find: [
    adminPermission,
    permissions.hooks.isPermitted(),
    auth.hooks.authenticate('jwt')
  ],
  get: [
    auth.hooks.authenticate('jwt')
  ],
  create: [
    adminPermission,
    permissions.hooks.isPermitted(),
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
    adminPermission,
    permissions.hooks.isPermitted(),
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
