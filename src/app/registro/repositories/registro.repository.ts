import { IDatabase } from 'pg-promise'
import { Registro } from '../entities/registro'
import { RegistroSearchContext } from '../entities/rentSearchContext'

export class RegistroRepository {
  constructor(private readonly db: IDatabase<any>) {
    this.db = db
  }

  buildingCreateQuery(registro: Registro): string {
    let insertString = 'INSERT INTO Registros ('
    let valueString = 'VALUES ('

    Object.entries(registro).forEach(([key, value], index) => {
      if (index === 0) {
        insertString += `${key}`
        valueString += `'${value}'`
      } else {
        insertString += `, ${key}`
        valueString += `, '${value}'`
      }
    })
    return `${insertString}) ${valueString});`
  }

  async verifyIfIsInRent(
    id: number,
    context: RegistroSearchContext,
  ): Promise<boolean> {
    const query = `SELECT * FROM Registros WHERE id_${context} = ${id} AND data_termino IS NULL;`
    const result = await this.db.query(query)
    return result.length > 0
  }

  async create(registro: Registro): Promise<void> {
    return this.db.query(this.buildingCreateQuery(registro))
  }

  async findOne(id: number): Promise<Registro[]> {
    const query = `SELECT * FROM Registros WHERE id = ${id};`
    return this.db.query(query)
  }

  async endingRegistro(id: number, dataTermino: string): Promise<void> {
    const query = `UPDATE Registros SET data_termino = '${dataTermino}' WHERE id = ${id};`
    return this.db.query(query)
  }

  async findAll(): Promise<Registro[]> {
    const query = `SELECT Registros.id, Registros.descricao, Registros.data_inicio, Registros.data_termino, 
    Automoveis.placa, Automoveis.marca, Automoveis.cor, 
    Motoristas.nome 
    FROM Registros
    JOIN Automoveis ON Registros.id_automovel = Automoveis.id
    JOIN Motoristas ON Registros.id_motorista = Motoristas.id;`
    return this.db.query(query)
  }
}
