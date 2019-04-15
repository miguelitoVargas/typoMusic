const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Unicode = require('./db').Unicode

app.prepare().then(() => {
  const server = express()

  // respond ok when page is opened
  server.get('/', (req, res) => app.render(req, res, '/'))
  server.get('/unicodes', (req, res) => {
    Unicode.find({}, function (err, unicodes) {
      if (err) res.status(500).send(err)
      res.send(unicodes)
    })
  })
  // render the list page
  server.get('/unicode_list', (req, res) => {
    //assign the id parameter from the request onto the query object
    return app.render(req, res, '/unicodeList')
  })

  // get some string
  server.get('/unicodeMe', (req, res) => {
    res.status(200).send({ type: 'tree', unicode: '\u{1085D}' })
  })

  // handle any request that are made to the sever
  server.get('/*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> T_c server on on http://localhost:${port}`)
  })
})
