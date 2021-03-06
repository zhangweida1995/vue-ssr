const fs = require('fs')
const express = require('express')
const favicon = require('serve-favicon')
const { createBundleRenderer } = require('vue-server-renderer')
const { resolve } = require('path')
const app = express()
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      basedir: resolve('./dist'), //显式地声明 server bundle 的运行目录。运行时将会以此目录为基准来解析 node_modules 中的依赖模块。
      runInNewContext: false, //bundle 代码将与服务器进程在同一个 global 上下文中运行
    })
  )
}
/** */
let renderer, readyPromise
const template = fs.readFileSync('./src/index.template.html', 'utf-8')
const templatePath = resolve('./src/index.template.html')
const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(serverBundle, {
    template,
    clientManifest,
  })
} else {
  //开发中：使用watch和hot reload设置dev服务器，
  //并在bundle/index模板更新时创建一个新的呈现器。
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => {
  return express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
  })
}
app.use(favicon('./public/logo.png'))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))

function render(req, res) {
  const s = Date.now()
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const handleError = (err) => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }
  const context = {
    title: 'Vue-SSR', // default title
    url: req.url,
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get(
  '*',
  isProd
    ? render
    : (req, res) => {
        readyPromise.then(() => render(req, res))
      }
)
const port = 8083
app.listen(port, () => {
  console.log(`on listen http://localhost:${port}`)
})
