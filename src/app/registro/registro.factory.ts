import { postgresConnection } from 'src/infrastrcture/database/connection'
import { RegistroRepository } from './repositories/registro.repository'
import { MotoristaRepository } from '../motorista/repositories/motorista.repository'
import { RegistroService } from './registro.service'
import { MotoristaService } from '../motorista/motorista.service'
import { RegistroController } from './registro.controller'
import { AutomovelRepository } from '../automovel/repositories/automovel.repository'
import { AutomovelService } from '../automovel/automovel.service'

export class RegistroFactory {
  public static create() {
    const db = postgresConnection
    const registroRepository = new RegistroRepository(db)
    const automovelRepository = new AutomovelRepository(db)
    const motoristaRepository = new MotoristaRepository(db)
    const motoristaService = new MotoristaService(motoristaRepository)
    const automovelService = new AutomovelService(automovelRepository)
    const registroService = new RegistroService(
      registroRepository,
      automovelService,
      motoristaService,
    )
    return new RegistroController(registroService)
  }
}
