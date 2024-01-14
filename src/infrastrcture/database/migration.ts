import { IDatabase } from 'pg-promise'
import { join } from 'path'
const pgp = require('pg-promise')()
export class Migration {
  public static async generateTables(db: IDatabase<any>): Promise<void> {
    const filePath = join(__dirname, 'sql-queries', 'create-tables.sql')
    const query = new pgp.QueryFile(filePath)
    await db.query(query)
  }
}
