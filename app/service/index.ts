import authentication from './authentication'
import user from './user'
import message from './message'

export default function () {
  const app = this

  app.configure(authentication)
    .configure(user)
    .configure(message)
}
