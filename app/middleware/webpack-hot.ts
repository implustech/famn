import * as webpack from 'webpack'
import webpackConfig from '../../client/config/webpack.dev'
const compiler = webpack(webpackConfig)


export default function () {
  const app = this

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}
