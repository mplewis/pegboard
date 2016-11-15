var maxDataUriBytes = 10000  // 10kb limit for inlined assets

module.exports = {
  entry: './src/app.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        query: {limit: maxDataUriBytes}
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {limit: maxDataUriBytes}
      },
      {
        test: /kendo-ui-core[\/\/\/].*\.js$/,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  resolve: {
    alias: {
      'kendo': 'kendo-ui-webpack'
    }
  },
  devtool: 'cheap-module-eval-source-map'
}
