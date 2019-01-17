var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './static/js/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize:true }),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',  
        include:[
            path.resolve(__dirname,'src'),
        ],
        exclude:[
            path.resolve(__dirname,'node_module')
        ],
        test:/\.js?$/,
        query:{
            presets:['es2015','stage-0','react']
        }
      }
    ]
  }
}