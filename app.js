const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const urlShortener = require('./url_shortener')
const Record = require('./models/record')



const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

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
  const newUrl = urlShortener(url)
  res.render('index', { url, newUrl })
})

app.listen(PORT, () => {
  console.log(`This app is opening on http://localhost:${PORT} .`)
})