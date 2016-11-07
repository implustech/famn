import * as mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  }
})

export default mongoose.model('Message', messageSchema)
