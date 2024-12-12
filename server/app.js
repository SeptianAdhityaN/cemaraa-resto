const express = require('express')
const app = express()

const cors = require('cors')
const menuRoutes = require('./routes/menuRoutes')
require('dotenv').config()

const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/menu', menuRoutes) 





app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Api service is running on port http://localhost:${port}/api/menu`)
})