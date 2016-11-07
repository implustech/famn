import * as bunyan from 'bunyan'

const logger = bunyan.createLogger({ name: 'famn' })

export default (app) => {
  // Add a logger to our app object for convenience
  app.logger = logger

  return (error, req, res, next) => {
    if (error) {
      const message = `${error.code ? `(${error.code}) ` : ''}Route: ${req.url} - ${error.message}`

      if (error.code === 404) {
        logger.info(message)
      } else {
        logger.error(message)
        logger.info(error.stack)
      }
    }
    next(error)
  }
}
