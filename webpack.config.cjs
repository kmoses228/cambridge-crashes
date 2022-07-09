// Import path for resolving file paths
var path = require("path");
module.exports = {
  // Specify the entry point for our app.
  entry: [path.join(__dirname, "src/index.js")],
  target: "node",
  // Specify the output file containing our bundled code
  output: {
    path: __dirname,
    filename: "dist/index.js",
  },
  module: {},
  resolve: {
    preferRelative: true,
    fallback: { crypto: false, fs: false, https: false, zlib: false },
  },
};
