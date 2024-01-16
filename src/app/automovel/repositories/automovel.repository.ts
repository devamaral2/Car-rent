import { IDatabase } from 'pg-promise'
import { Automovel } from '../entities/automovel'
import { IAutomovelRepository } from './interface/automovel.interface.repository'
import { A } from 'vitest/dist/reporters-trlZlObr'

export class AutomovelRepository implements IAutomovelRepository {
  constructor(private readonly db: IDatabase<any>) {
    this.db = db
  }

  buildingFindAllQuery(query?: Partial<Automovel>): string {
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

  buildingUpdateQuery(id: number, automovel: Partial<Automovel>): string {
    let sqlQuery = 'UPDATE automoveis SET '
    Object.entries(automovel).forEach(([key, value], index) => {
      if (index === 0) sqlQuery += `${key} = '${value}'`
      else sqlQuery += `, ${key} = '${value}'`
    })
    return `${sqlQuery} WHERE id = '${id}'`
  }

  buildingCreateQuery(automovel: Automovel): string {
    const { placa, marca, cor } = automovel
    return `
    INSERT INTO Automoveis (placa, marca, cor) 
    VALUES ('${placa}', '${marca}', '${cor}');`
  }

  async verifyIfAutomovelExists(id: number): Promise<boolean> {
    const sqlFindQuery = `SELECT * FROM Automoveis WHERE id = '${id}'`
    const automoveis = await this.db.query(sqlFindQuery)
    if (!automoveis.length) return false
    return true
  }

  async create(automovel: Automovel): Promise<void> {
    return this.db.query(this.buildingCreateQuery(automovel))
  }

  async update(id: number, automovel: Partial<Automovel>): Promise<boolean> {
    const automovelExist = await this.verifyIfAutomovelExists(id)
    await this.db.query(this.buildingUpdateQuery(id, automovel))
    return automovelExist
  }

  async findAll(query?: Partial<Automovel>): Promise<Automovel[]> {
    return this.db.query(this.buildingFindAllQuery(query))
  }

  async findOne(id: number): Promise<Automovel[]> {
    const sqlQuery = `SELECT * FROM automoveis WHERE id = '${id}'`
    return this.db.query(sqlQuery)
  }

  async delete(id: number): Promise<boolean> {
    const automovelExist = await this.verifyIfAutomovelExists(id)
    const sqlQuery = `DELETE FROM automoveis WHERE id = '${id}'`
    await this.db.none(sqlQuery)
    return automovelExist
  }
}
