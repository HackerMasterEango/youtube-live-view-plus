// Super based webpack.config.js for web extensions that use react.
// Why hasn't google or facebook streamlined this yet omg what a pile of garbage.

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    historyApiFallback: true
  },
  entry: {
    'content-script': path.resolve(__dirname, './src/content-script.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  plugins: ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'content-script.html',
      template: 'src/content-script.html',
      chunks: ['content-script']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '[name][ext]' },
        { from: 'src/background.js', to: '[name][ext]' },
        { from: 'src/inject.js', to: '[name][ext]' }
      ]
    }),
    new CleanWebpackPlugin()
  ]
}
