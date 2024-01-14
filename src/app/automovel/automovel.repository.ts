import { IDatabase } from 'pg-promise'
import { Automovel } from './entities/automovel'
import { IAutomovelFindAllQueryDTO } from './entities/dto/automovel-findlAll-query.dto'

export class AutomovelRepository {
  constructor(private readonly db: IDatabase<any>) {
    this.db = db
  }

  //   async create(automovel: Automovel): Promise<Automovel> {
  //     const createdAutomovel = new this.automovelModel(automovel)
  //     return createdAutomovel.save()
  //   }

  buildingFindAllQuery(query: IAutomovelFindAllQueryDTO): string {
    let sqlQuery = 'SELECT * FROM automoveis'
    console.log(query)
    Object.entries(query).forEach(([key, value], index) => {
      if (index === 0) {
        console.log(` WHERE ${key} = '${value}'`)
        sqlQuery += ` WHERE ${key} = '${value}'`
        console.log(key)
      } else {
        sqlQuery += ` AND ${key} = '${value}'`
      }
    })
    console.log(sqlQuery)
    return sqlQuery
  }

  async findAll(query: IAutomovelFindAllQueryDTO): Promise<Automovel[]> {
    return this.db.query(this.buildingFindAllQuery(query))
  }

  //   async findOne(placa: string): Promise<Automovel | null> {
  //     return this.automovelModel.findOne({ placa }).exec()
  //   }

  //   async updateOne(placa: string, automovel: Automovel): Promise<Automovel> {
  //     return this.automovelModel.findOneAndUpdate({ placa }, automovel).exec()
  //   }

  //   async deleteOne(placa: string): Promise<Automovel | null> {
  //     return this.automovelModel.findOneAndDelete({ placa }).exec()
  //   }
}
