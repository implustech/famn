import * as globalHooks from '../../../hooks'
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication').hooks


// const populateSender = hooks.populate('sentBy', {
//   service: 'users',
//   filed: 'email'
// })


const before = {
  all: [
    // auth.verifyToken()
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
