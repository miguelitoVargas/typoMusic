const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const Unicode = require('./db').Unicode


app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  // respond ok when page is opened
  server.get('/', (req, res) => app.render(req, res, '/'))
  // get array of unicodes in db
  server.get('/unicodes', (req, res) => {
    Unicode.find({}, function (err, unicodes) {
      if (err) res.status(500).send(err)
      res.send(unicodes)
    })
  })
  // get array of known types
  server.get('/types', (req, res) => {
    Unicode.find({}, function (err, unicodes) {
      if (err) res.status(500).send(err)
        const types = unicodes.map(unicode => unicode.type)
          .filter((item, index, array) => array.indexOf(item) === index)
      res.send(types)
    })
  })
  // render the list page
  server.get('/unicode_list', (req, res) => {
    //assign the id parameter from the request onto the query object
    return app.render(req, res, '/unicodeList')
  })

  // post new unicode
  server.post('/add_unicode', (req, res) => {
    //const res = await Person.updateMany({ name: /Stark$/ }, { isDeleted: true });
    //const hasTheUnicode = await Unicode.findOne({unicode: `${req.body.unicode}`}, (err,unicode) => {})
    console.log('<<testawait', test)
    Unicode.findOne({unicode: `${req.body.unicode}`}, (err, unicode) => {

      console.log('<<found already or not', unicode, err)
    })
    const data =`received an add request for  ${JSON.stringify(req.body)}`
    console.log('<< got a fucking req for post', req.body.unicode)
    res.status(200).send({ data })
  })

  // handle any request that are made to the sever
  server.get('/*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> T_c server on on http://localhost:${port}`)
  })
})
