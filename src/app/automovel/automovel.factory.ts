import { AutomovelRepository } from './repositories/automovel.repository'
import { AutomovelService } from './automovel.service'
import { AutomovelController } from './automovel.controller'
import { postgresConnection } from 'src/infrastrcture/database/connection'

export class AutomovelFactory {
  public static create() {
    const db = postgresConnection
    const automovelRepository = new AutomovelRepository(db)
    const automovelService = new AutomovelService(automovelRepository)
    return new AutomovelController(automovelService)
  }
}
