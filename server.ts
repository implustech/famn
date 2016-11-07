import app from './app/app'
const port = app.get('port')
const server = app.listen(port)

server.on('listening', () =>
  console.log(`Famn application started on ${app.get('host')}:${port}`)
)

