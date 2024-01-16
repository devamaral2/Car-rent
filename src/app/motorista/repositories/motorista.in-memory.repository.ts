import { Motorista } from '../entities/motorista'
import { IMotoristaRepository } from './interface/motorista.interface.repository'

export class MotoristaInMemoryRepository implements IMotoristaRepository {
  public motoristas: Motorista[] = []
  private mockId = 0
  buildingFindAllQuery(query: Partial<Motorista>): string {
    throw new Error('Method not implemented.')
  }

  buildingUpdateQuery(id: number, motorista: Partial<Motorista>): string {
    throw new Error('Method not implemented.')
  }

  buildingCreateQuery(motorista: Motorista): string {
    throw new Error('Method not implemented.')
  }

  async verifyIfMotoristaExists(id: number): Promise<boolean> {
    return this.motoristas.some((motorista) => motorista.id === id)
  }

  async create(motorista: Motorista): Promise<void> {
    this.motoristas.push({ ...motorista, id: (this.mockId += 1) })
  }

  async update(id: number, motorista: Motorista): Promise<boolean> {
    const index = this.motoristas.findIndex((motorista) => motorista.id === id)
    if (index === -1) {
      return false
    }
    this.motoristas[index] = { ...this.motoristas[index], ...motorista }
    return true
  }

  async findAll(query?: Partial<Motorista>): Promise<Motorista[]> {
    if (query?.nome) {
      return this.motoristas.filter(
        (motorista) => motorista.nome === query.nome,
      )
    }
    return this.motoristas
  }

  async findOne(id: number): Promise<Motorista[]> {
    const motorista = this.motoristas.find((motorista) => motorista.id === id)
    if (!motorista) return []
    return [motorista]
  }

  async delete(id: number): Promise<boolean> {
    const motoristaExist = await this.verifyIfMotoristaExists(id)
    this.motoristas = this.motoristas.splice(id, 1)
    return motoristaExist
  }
}
