module.exports = {
  entry: './src/index.js',
  target: 'node',
  externals: ["aws-sdk"],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname
    }]
  }
};
