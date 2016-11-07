import authentication from './authentication'
import user from './user'
import message from './message'

export default function () {
  const app = this

  app.configure(authentication)
  app.configure(user)
  app.configure(message)
}
