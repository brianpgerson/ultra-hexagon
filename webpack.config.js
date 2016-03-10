var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./public/javascripts/entry.js",
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },

  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
