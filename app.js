const express = require('express')
const exphbs = require('express-handlebars')
require("./config/mongoose")

const urlShortener = require('./url_shortener')
const URL = require('./models/URL')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

// 首頁
app.get('/',(req, res) => {
  res.render('index')
})

// 網址結果
app.post('/',(req, res) => {
  const url = req.body.url
  const shortURL = urlShortener(url)

  if (!url) return res.redirect("/")

  URL.findOne({ originalURL: url })
    .then(data =>
      data ? data : URL.create({ shortURL, originalURL: url })
    )
    .then(data =>
      res.render("index", {
        url,
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(error => console.error(error))
})

app.listen(PORT, () => {
  console.log(`This app is opening on http://localhost:${PORT} .`)
})