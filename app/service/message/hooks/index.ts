import * as globalHooks from '../../../hooks'
// const auth = require('feathers-authentication')




const before = {
  all: [
    // auth.hooks.authenticate('jwt')
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}

const after = {
  all: [],
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
