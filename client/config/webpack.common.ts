/**
 * @author: hjl
 */

const webpack = require('webpack')
import helpers from './helpers'
import headTags from './html-head-config'

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const HtmlElementsPlugin = require('./html-elements-plugin')


/*
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development'
const HMR = helpers.hasProcessFlag('hot')
const METADATA = {
  title: 'Implus Admin Seed',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
}

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
export default (options) => {
  let isProd = options.env === 'production'
  return {

    // /*
    //  * Static metadata for index.html
    //  *
    //  * See: (custom attribute)
    //  */
    // metadata: METADATA,

    /*
     * Cache generated modules and chunks to improve performance for multiple incremental builds.
     * This is enabled by default in watch mode.
     * You can pass false to disable it.
     *
     * See: http://webpack.github.io/docs/configuration.html#cache
     */
    //cache: false,

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

      'polyfills': './client/polyfills.ts',
      'vendor': './client/vendor.ts',
      'main': './client/main.ts'

    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: https://webpack.github.io/docs/configuration.html#externals
     */
    externals: {
      jquery: 'jQuery'
    },

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
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), 'node_modules']
    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      rules: [

        /*
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          loaders: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader',
            // '@angularclass/hmr-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
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

        /*
         * to string and css loader support for *.css files
         * Returns file content as string
         *
         */
        {
          test: /\.css$/,
          // loaders: ['to-string-loader', 'css-loader']
          loaders: ['style-loader', 'css-loader']
        },

        /*
         * to string and sass loader support for *.sass files
         * Returns file content as string
         *
         */
        {
          test: /\.scss$/,
          exclude: /node_modules|global/,
          loaders: ['raw', 'sass']
        },
        {
          test: /global\.scss$/,
          loaders: ['style', 'css', 'sass']
        },

        /* Raw loader support for *.html
         * Returns file content as string
         *
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('client/index.html')]
        },

        /* File loader for supporting images, for example, in CSS files.
        */
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        },
        /* URL loader for various assets
          */
        // {
        //   test: /\.(jpg|png|gif)$/,
        //   loader: 'file'
        // },

        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&minetype=application/font-woff'
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&minetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&minetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&minetype=image/svg+xml'
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url?limit=10000'
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
      /*
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),


      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('client') // location of your src
      ),

      new webpack.ProvidePlugin({
        $: 'jquery'
      }),

      /*
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
        from: 'client/assets',
        to: 'assets'
      }, {
        from: 'client/assets/favicon.ico',
        to: 'favicon.ico'
      }, {
        from: 'client/app/meta.json',
        to: 'meta.json'
      }]),

      /*
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'client/index.html',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),



      /*
       * Plugin: HtmlHeadConfigPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: headTags
      }),

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
}
