const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json').results

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const keyword = req.query.keyword.trim()

  const restaurants = restaurantList.filter(item => item.name.toLowerCase().trim().includes(keyword) || item.category.trim().includes(keyword))

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})