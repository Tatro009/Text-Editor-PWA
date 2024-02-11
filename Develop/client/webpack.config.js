const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = {
  mode: 'development',
  entry: {
    main: '/Develop/client/src/js/index.js',
    install: '/Develop/client/src/js/install.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Handle JavaScript files with Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      
      // Handle CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // Clean the 'dist' folder before each build
    new CleanWebpackPlugin(),
    
    // Generate HTML files
    new HtmlWebpackPlugin({
      template: '/client/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: '/client/install.html',
      filename: 'install.html',
      chunks: ['install'],
    }),
    
    // Add and configure Workbox plugins
    new InjectManifest({
      swSrc: '/Develop/client/src-sw.js', // Service worker source file
      swDest: '/Develop/service-worker.js', // Service worker destination file
    }),

    new WebpackPwaManifest({
      name: 'Just Another Text Editor',
      short_name: 'J.A.T.E',
      description: 'A simple text editor for writing notes and code snippets',
      background_color: '#ffffff',
      theme_color: '#2196f3',
      icons: [
        {
          src: path.resolve(__dirname, '/Develop/client/src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes for different devices
          destination: path.join('assets', 'icons'),
          ios: true,
        },
      ],
      filename: 'manifest.json', // Name of the output manifest file
      crossorigin: null, // Setting crossorigin to null will disable CORS headers
    }),
    // Generate a manifest file to map output file names to their corresponding input file
    new WebpackManifestPlugin()
  ],
};
