var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob')
var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

/**
 * 修改部分 多页面
 * hxm start
 */
var entries = getEntry(path.resolve(__dirname,'../src/module/**/*.js')); // 获得入口js文件
function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;
    console.log(globPath)
    // glob.sync 返回的是匹配到的文件的数组
  glob.sync(globPath).forEach(function (entry) {
    // path.basename('/foo/bar/baz/asdf/quux.html', '.html')
    // Returns: 'quux'  第二个参数是指定后缀名
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    console.log(tmp)
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });

  return entries;
}
console.log(entries)
/**
 * 修改部分 多页面
 * hxm end
 */
module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'], // 引入时可以省略后缀名
    fallback: [path.join(__dirname, '../node_modules')], // 在当前文件夹找不到是 去node_modules下寻找文件
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
