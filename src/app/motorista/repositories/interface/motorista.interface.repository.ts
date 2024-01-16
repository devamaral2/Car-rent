import { Motorista } from '../../entities/motorista'

export interface IMotoristaRepository {
  buildingFindAllQuery(query: Partial<Motorista>): string
  buildingCreateQuery(motorista: Motorista): string
  verifyIfMotoristaExists(id: number): Promise<boolean>
  create(motorista: Motorista): Promise<void>
  update(id: number, motorista: Partial<Motorista>): Promise<boolean>
  findAll(query?: Motorista): Promise<Motorista[]>
  findOne(id: number): Promise<Motorista[]>
  delete(id: number): Promise<boolean>
}
