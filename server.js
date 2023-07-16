const express = require('express')
const routes = require('./routes')
const { mw } = require('./middleware')
// import sequelize connection

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mw)
app.use(routes)

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
