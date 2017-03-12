/**
 * @author: hjl
 */

const webpack = require('webpack')
const webpackMerge = require('webpack-merge') // used to merge webpack configs
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' })
import { helpers } from './helpers'
import { webpackCommonConfig } from './webpack.common' // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin





/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development'
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3030
const HMR = process.env.HMR
// const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
const METADATA = webpackMerge({}, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
})



/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */


export default webpackMerge(webpackCommonConfig({ env: ENV }), {


  /**
   * Merged metadata from webpack.common.js for index.html
   *
   * See: (custom attribute)
   */
  // metadata: METADATA,

  /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    // 'polyfills': ['./client/polyfills.ts'].concat(HMR ? ['webpack-hot-middleware/client'] : []),
    'polyfills': ['./client/polyfills.ts'],
    'main': ['./client/main.ts'].concat(HMR ? ['webpack-hot-middleware/client'] : []),
  },



  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'cheap-module-source-map',

  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {

    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: helpers.root('dist/client'),

    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].bundle.js',

    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: '[file].map',

    /** The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: '[id].chunk.js',

    library: 'ac_[name]',
    libraryTarget: 'var',
  },

  plugins: [

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
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    }),

    new DllBundlesPlugin({
      bundles: {
        polyfills: [
          'core-js',
          {
            name: 'zone.js',
            path: 'zone.js/dist/zone.js'
          },
          {
            name: 'zone.js',
            path: 'zone.js/dist/long-stack-trace-zone.js'
          }
        ],
        vendor: [
          '@angular/platform-browser',
          '@angular/platform-browser-dynamic',
          '@angular/core',
          '@angular/common',
          '@angular/forms',
          '@angular/http',
          '@angular/router',
          '@angularclass/hmr',
          'socket.io-client',
          'feathers',
          'feathers-socketio',
          'feathers-hooks',
          'feathers-authentication-client',
          'feathers-reactive',
          'rxjs',
        ]
      },
      dllDir: helpers.root('dll'),
      webpackConfig: webpackMergeDll(webpackCommonConfig({ env: ENV }), {
        devtool: 'cheap-module-source-map',
        plugins: []
      })
    }),

    /**
     * Plugin: AddAssetHtmlPlugin
     * Description: Adds the given JS or CSS file to the files
     * Webpack knows about, and put it into the list of assets
     * html-webpack-plugin injects into the generated html.
     *
     * See: https://github.com/SimenB/add-asset-html-webpack-plugin
     */
    new AddAssetHtmlPlugin([
      { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
      { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
    ]),


    /**
     * Plugin LoaderOptionsPlugin (experimental)
     *
     * See: https://gist.github.com/sokra/27b24881210b56bbaff7
     */
    new LoaderOptionsPlugin({
      debug: true,
      options: {
      }
    }),


    // Used with webpack-hot-middllware
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()

  ],

  /**
   * Webpack Development Server configuration
   * Description: The webpack-dev-server is a little node.js Express server.
   * The server emits information about the compilation state to the client,
   * which reacts to those events.
   *
   * See: https://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist/client')
  },

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
})
