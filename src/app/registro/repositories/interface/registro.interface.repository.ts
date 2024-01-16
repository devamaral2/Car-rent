import { Registro } from '../../entities/registro'
import { RegistroSearchContext } from '../../entities/rentSearchContext'

export interface IRegistroRepository {
  buildingCreateQuery(registro: Partial<Registro>): string
  verifyIfIsInRent(id: number, context: RegistroSearchContext): Promise<boolean>
  create(registro: Partial<Registro>): Promise<void>
  findOne(id: number): Promise<Registro[]>
  endingRegistro(id: number, dataTermino: string): Promise<void>
  findAll(): Promise<Registro[]>
}
