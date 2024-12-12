const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: "5432",
  database: "postgres",
  user: "postgres.ogkbfagrbjprrvadfrsn",
  password: "L5YcY6Dh9viBP_L",
  max: 20,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 2000,
})

pool.connect()
  .then(client => {
    console.log('Connected to database')
    client.release()
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.stack)
  })

module.exports = pool