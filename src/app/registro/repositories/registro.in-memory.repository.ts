import { Registro } from '../entities/registro'
import { RegistroSearchContext } from '../entities/rentSearchContext'
import { IRegistroRepository } from './interface/registro.interface.repository'

export class RegistroInMemoryRepository implements IRegistroRepository {
  private registros: Registro[] = []
  private id = 0

  buildingCreateQuery(registro: Registro): string {
    // Não é necessário para o repositório in-memory
    return ''
  }

  async verifyIfIsInRent(
    id: number,
    context: RegistroSearchContext,
  ): Promise<boolean> {
    return this.registros.some(
      (registro) =>
        (registro[`id_${context}`] === id && registro?.data_termino === null) ||
        !registro?.data_termino,
    )
  }

  async create(registro: Registro): Promise<void> {
    await this.registros.push({ ...registro, id: ++this.id })
  }

  async findOne(id: number): Promise<Registro[]> {
    const registro = this.registros.find((registro) => registro.id === id)
    return registro ? [registro] : []
  }

  async endingRegistro(id: number, dataTermino: string): Promise<void> {
    const registro = this.registros.find((registro) => registro.id === id)
    if (registro) {
      registro.data_termino = dataTermino
    }
  }

  async findAll(): Promise<Registro[]> {
    return this.registros
  }
}
