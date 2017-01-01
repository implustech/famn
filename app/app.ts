import * as chalk from 'chalk'
import * as path from 'path'
import * as compress from 'compression'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
const feathers = require('feathers')
const serveStatic = require('feathers').static
const conf = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')
const handler = require('feathers-errors/handler')

import service from './service'
import middleware from './middleware'

const app = feathers()


// TO-FIX
// Enable webpack-hot-middleware here for development
if (process.env.NODE_ENV === 'development' && process.env.HMR) {
  const webpackdev = require('./middleware/webpack-hot')
  app.configure(webpackdev.default)
}

app.configure(conf());

(mongoose as any).Promise = global.Promise
const config = app.get('mongodb')
const endpoint = `mongodb://${config.server.host}:${config.server.port}/${config.db}`

mongoose.connect(endpoint)
mongoose.connection.on('error', err => {
  console.error('connection error: ', err)
  process.exit(1)
})
mongoose.connection.on('open', () => {
  console.log(`MongoDB is connected at ${endpoint}`)
})

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use('/', serveStatic(app.get('public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(service)
  .configure(middleware)

export default app
