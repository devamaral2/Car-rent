import { IDatabase } from 'pg-promise'
import { Automovel } from './entities/automovel'
import { IAutomovelFindAllQueryDTO } from './entities/dto/automovel-findlAll-query.dto'
import { IAutomovelUpdateDTO } from './entities/dto/automovelUpdate.dto'

export class AutomovelRepository {
  constructor(private readonly db: IDatabase<any>) {
    this.db = db
  }

  buildingFindAllQuery(query: IAutomovelFindAllQueryDTO): string {
    let sqlQuery = 'SELECT * FROM automoveis'
    Object.entries(query).forEach(([key, value], index) => {
      if (index === 0) {
        sqlQuery += ` WHERE ${key} = '${value}'`
      } else {
        sqlQuery += ` AND ${key} = '${value}'`
      }
    })
    return sqlQuery
  }

  buildingUpdateQuery(id: string, automovel: IAutomovelUpdateDTO): string {
    let sqlQuery = 'UPDATE automoveis SET '
    Object.entries(automovel).forEach(([key, value], index) => {
      if (index === 0) sqlQuery += `${key} = '${value}'`
      else sqlQuery += `, ${key} = '${value}'`
    })
    return `${sqlQuery} WHERE id = '${Number(id)}'`
  }

  buildingCreateQuery(automovel: Automovel): string {
    const { placa, marca, cor } = automovel
    return `
    INSERT INTO Automoveis (placa, marca, cor) 
    VALUES ('${placa}', '${marca}', '${cor}');`
  }

  async create(automovel: Automovel): Promise<void> {
    return this.db.query(this.buildingCreateQuery(automovel))
  }

  async update(id: string, automovel: IAutomovelUpdateDTO): Promise<void> {
    await this.db.query(this.buildingUpdateQuery(id, automovel))
  }

  async findAll(query: IAutomovelFindAllQueryDTO): Promise<Automovel[]> {
    return this.db.query(this.buildingFindAllQuery(query))
  }

  async findOne(id: string): Promise<Automovel[]> {
    const sqlQuery = `SELECT * FROM automoveis WHERE id = '${Number(id)}'`
    return this.db.query(sqlQuery)
  }

  async delete(id: string): Promise<boolean> {
    const sqlFindQuery = `SELECT * FROM automoveis WHERE id = '${Number(id)}'`
    const automovel = await this.db.query(sqlFindQuery)
    if (!automovel.length) return false
    const sqlQuery = `DELETE FROM automoveis WHERE id = '${Number(id)}'`
    await this.db.none(sqlQuery)
    return true
  }
}
