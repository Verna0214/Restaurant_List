const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`This is the restaurant list web.`)
})

app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})