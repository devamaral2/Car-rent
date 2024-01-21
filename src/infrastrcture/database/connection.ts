const pgp = require('pg-promise')()
import dotenv from 'dotenv'
dotenv.config()

export const postgresConnection = pgp(
  `postgres://${process.env.PGSQL_USER}:${process.env.PGSQL_PASSWORD}@localhost:5432/postgres`,
)
