const path = require('path')
module.exports = {
  publicPath:'http://47.100.92.1/supermall',
  configureWebpack: {
    resolve: {
      alias:{
        'assets':'@/assets',
        'commonjs':'@/commonjs',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        'store':'@/store'
      }
    }
  }
} 