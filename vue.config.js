const path = require('path')
const appDate = require('./data.json')
const seller = appDate.seller
const goods = appDate.goods
const ratings = appDate.ratings

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  // 通过api mock数据
  devServer: {
    before (app) {
      app.get('/api/seller', function (req, res) {
        const id = req.query.id
        res.json({
          errno: 0,
          data: Object.assign({}, seller, { id })
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  }
}
