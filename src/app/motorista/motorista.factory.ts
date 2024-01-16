import { postgresConnection } from 'src/infrastrcture/database/connection'
import { MotoristaService } from './motorista.service'
import { MotoristaRepository } from './repositories/motorista.repository'
import { MotoristaController } from './motorista.controller'

export class MotoristaFactory {
  public static create() {
    const db = postgresConnection
    const motorostaRepository = new MotoristaRepository(db)
    const motoristaService = new MotoristaService(motorostaRepository)
    return new MotoristaController(motoristaService)
  }
}
