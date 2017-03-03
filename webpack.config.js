const config = {
  entry: './src/main.js',

  output: {
    path:'./src/static/',
    filename: 'bundle.js'
  },

  devServer: {
    inline: true,
    port: 8080
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

module.exports = config;
