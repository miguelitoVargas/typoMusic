const webpack = require('webpack')
require('dotenv').config()

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.plugins.push(
      new webpack.EnvironmentPlugin(['API_URL'])
    )

    return config
  }
}
