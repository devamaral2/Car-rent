import { IDatabase } from 'pg-promise'
const pgp = require('pg-promise')()

export class Connection {
  public static connect(): IDatabase<any> {
    return pgp('postgres://admin:12345@localhost:5432/postgres')
  }
}
