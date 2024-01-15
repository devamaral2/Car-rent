import { IDatabase } from 'pg-promise'
const pgp = require('pg-promise')()

export const postgresConnection = pgp(
  'postgres://admin:12345@localhost:5432/postgres',
)
