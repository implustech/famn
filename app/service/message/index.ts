const service = require('feathers-mongoose')
import hooks from './hooks'
import MessageModel from '../../models/message'

export default function() {
  const app = this

  let options = {
    Model: MessageModel,
    paginate: {
      default: 100,
      max: 200
    }
  }

  app.use('/messages', service(options))
  const messageService = app.service('messages')
  messageService.before(hooks.before)
  messageService.after(hooks.after)
}
