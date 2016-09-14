module.exports = {
  entry: './handler.js',
  target: 'node',
  externals: ["aws-sdk"],
  debug:true,
  devtool:'eval-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: [
          /\.serverless/,
          /node_modules/
      ]
    }]
  }
};
