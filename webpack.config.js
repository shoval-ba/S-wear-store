module.exports = {
  mode: 'development',
  entry: {
    // app: "./dist/tsc/client/app.js",
    // admin: './dist/tsc/client/admin.js'
  },
  devtool: "source-map",
  output: {
      filename: "[name].js",
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              enforce: "pre",
              use: ["source-map-loader"],
          },
      ],
  }
}