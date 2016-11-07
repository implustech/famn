/**
 * @author: hjl
 */

const webpack = require('webpack')
import helpers from '../../client/config/helpers'

/*
 * Webpack Plugins
 */
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin
const DefinePlugin = require('webpack/lib/DefinePlugin')



/*
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production'
const METADATA = {
  ENV: ENV,
  title: 'Implus Admin Seed - server',
  // baseUrl: '/'
}

const fs = require('fs')
// Look here http://jlongster.com/Backend-Apps-with-Webpack--Part-I
const nodeModules = {}
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => nodeModules[mod] = 'commonjs ' + mod)

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
export default {
  target: 'node',

  /*
   * Static metadata for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  /*
   * Cache generated modules and chunks to improve performance for multiple incremental builds.
   * This is enabled by default in watch mode.
   * You can pass false to disable it.
   *
   * See: http://webpack.github.io/docs/configuration.html#cache
   */
  cache: false,

  /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: './server.ts',

  output: {
    path: helpers.root('dist/server'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },

  devtool: 'source-map',
  externals: nodeModules,


  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js', '.json'],

    // Make sure client root is client
    root: helpers.root('app'),

    // remove other default values
    modulesDirectories: ['node_modules'],

  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    /*
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    preLoaders: [
      {
        test: /\.(ts|js)$/,
        loader: 'tslint',
        exclude: /node_modules|bower_components|webpack/,
      },
    ],

    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [
      /*
      * Typescript loader support for .ts and Angular 2 async routes via .async.ts
      * Replace templateUrl and stylesUrl with require()
      *
      * See: https://github.com/s-panferov/awesome-typescript-loader
      * See: https://github.com/TheLarkInn/angular2-template-loader
      */
      {
        test: /\.(ts|js)$/,
        loaders: [
          'awesome-typescript-loader',
        ],
        query: { forkChecker: true },
        // exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
        exclude: [/node_modules/]
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]

  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
    // new DefinePlugin({
    //   'ENV': JSON.stringify(METADATA.ENV),
    //   'process.env': {
    //     'ENV': JSON.stringify(METADATA.ENV),
    //     'NODE_ENV': JSON.stringify(METADATA.ENV)
    //   }
    // }),
  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
