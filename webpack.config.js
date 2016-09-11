module.exports = {
  entry: './handler.js',
  target: 'node',
  externals: ["aws-sdk"],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: /\.serverless/
    }]
  }
};
