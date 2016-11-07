const errors = require('feathers-errors')

export default () => {
  return (req, res, next) => {
    next(new errors.NotFound('Page not found'))
  }
}
