import { RegistroRepository } from './repositories/registro.repository'
import { Registro } from './entities/registro'
import { registroVerifier } from './registroVerifier'
import { throwErrorHandler } from '../utils/throwErrorHandler'
import { AutomovelService } from '../automovel/automovel.service'
import { MotoristaService } from '../motorista/motorista.service'
import { IRegistroRepository } from './repositories/interface/registro.interface.repository'

export class RegistroService {
  constructor(
    private readonly repository: IRegistroRepository,
    private readonly automovelService: AutomovelService,
    private readonly motoristaService: MotoristaService,
  ) {
    this.repository = repository
  }

  async verifyIfEntitiesExists(
    idAutomovel: number,
    idMotorista: number,
  ): Promise<void> {
    await this.automovelService.findOne(idAutomovel)
    await this.motoristaService.findOne(idMotorista)
  }

  async verifyRenting(idAutomovel: number, idMotorista: number): Promise<void> {
    const automovelIsInRent = await this.repository.verifyIfIsInRent(
      idAutomovel,
      'automovel',
    )
    if (automovelIsInRent)
      throwErrorHandler(new Error('O automóvel já está alugado'))
    const motoristaIsRenting = await this.repository.verifyIfIsInRent(
      idMotorista,
      'motorista',
    )
    if (motoristaIsRenting) {
      throwErrorHandler(new Error('O motorista já está alugando'))
    }
  }

  async create(registro: Registro): Promise<void> {
    try {
      const registroVerified = registroVerifier(registro)
      await this.verifyIfEntitiesExists(
        registro.id_automovel,
        registro.id_motorista,
      )
      await this.verifyRenting(registro.id_automovel, registro.id_motorista)
      await this.repository.create(registroVerified)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async endingRegistro(id: number, dataTermino: string): Promise<void> {
    try {
      const registro = await this.repository.findOne(id)
      if (!registro.length)
        throwErrorHandler(new Error('Registro não encontrado'))
      if (registro[0].data_termino)
        throwErrorHandler(new Error('Registro já finalizado'))
      await this.repository.endingRegistro(id, dataTermino)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async findAll(): Promise<Registro[]> {
    try {
      return this.repository.findAll()
    } catch (e) {
      throwErrorHandler(e)
    }
  }
}
