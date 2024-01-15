import { IDatabase } from 'pg-promise'
import { Motorista } from './entities/motorista'
import { IMotoristaFindAllQueryDTO } from './entities/dto/motoristaFindAllQuery.dto'

export class MotoristaRepository {
  constructor(private readonly db: IDatabase<any>) {
    this.db = db
  }

  buildingFindAllQuery(query: IMotoristaFindAllQueryDTO): string {
    let sqlQuery = 'SELECT * FROM Motoristas'
    if (query?.nome) {
      sqlQuery += ` WHERE nome = '${query?.nome}'`
    }
    return sqlQuery
  }

  buildingCreateQuery(motorista: Motorista): string {
    const { nome } = motorista
    return `
    INSERT INTO Motoristas (nome) 
    VALUES ('${nome}');`
  }

  async verifyIfMotoristaExists(id: number): Promise<boolean> {
    const sqlFindQuery = `SELECT * FROM Motoristas WHERE id = '${id}'`
    const motorista = await this.db.query(sqlFindQuery)
    if (!motorista.length) return false
    return true
  }

  async create(motorista: Motorista): Promise<void> {
    return this.db.query(this.buildingCreateQuery(motorista))
  }

  async update(id: number, motorista: Motorista): Promise<boolean> {
    const motoristaExist = await this.verifyIfMotoristaExists(id)
    const sqlQuery = `UPDATE Motoristas SET nome = '${motorista.nome}' WHERE id = '${id}'`
    await this.db.none(sqlQuery)
    return motoristaExist
  }

  async findAll(query: IMotoristaFindAllQueryDTO): Promise<Motorista[]> {
    return this.db.query(this.buildingFindAllQuery(query))
  }

  async findOne(id: number): Promise<Motorista[]> {
    const sqlQuery = `SELECT * FROM Motoristas WHERE id = '${id}'`
    return this.db.query(sqlQuery)
  }

  async delete(id: number): Promise<boolean> {
    const motoristaExist = await this.verifyIfMotoristaExists(id)
    const sqlQuery = `DELETE FROM Motoristas WHERE id = '${id}'`
    await this.db.none(sqlQuery)
    return motoristaExist
  }
}
