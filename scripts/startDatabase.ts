import { postgresConnection } from 'src/infrastrcture/database/connection'
const pgp = require('pg-promise')()

async function start() {
  const db = postgresConnection
  try {
    await db.query('SELECT * FROM automoveis')
    console.log('As tabelas já foram criadas')
  } catch {
    const migration = new pgp.QueryFile('../sql-queries/create-tables.sql')
    await db.query(migration)
    console.log('Tabelas criadas com sucesso!')
  }
  try {
    const automoveisNumber = await db.query('SELECT COUNT(*) FROM automoveis')
    // const motoristasNumber = await db.query('SELECT COUNT(*) FROM motoristas')
    // const alugueisNumber = await db.query('SELECT COUNT(*) FROM alugueis')
    const isEmpty = (answer: { count: string }[]): boolean => {
      return answer[0].count === '0'
    }
    if (isEmpty(automoveisNumber)) {
      const query = new pgp.QueryFile('../sql-queries/seed-database.sql')
      await db.query(query)
      console.log('Dados inseridos com sucesso!')
    }
  } catch (error) {
    console.log(error)
  }
}
start()
