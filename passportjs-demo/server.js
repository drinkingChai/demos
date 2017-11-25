const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/auth', require('./auth'))

const port = 8000
app.listen(port, () => console.log(`listening to port ${port}`))