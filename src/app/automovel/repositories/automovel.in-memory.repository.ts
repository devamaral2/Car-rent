import { Automovel } from '../entities/automovel'
import { IAutomovelRepository } from './interface/automovel.interface.repository'

export class AutomovelInMemoryRepository implements IAutomovelRepository {
  public automoveis: Automovel[] = []
  private mockId = 0

  buildingFindAllQuery(query?: Partial<Automovel>): Automovel[] | string {
    return this.automoveis.filter((automovel) => {
      return Object.entries(query).every(([key, value]) => {
        return automovel[key] === value
      })
    })
  }

  buildingUpdateQuery(id: number, automovel: Partial<Automovel>): string {
    throw new Error('Method not implemented.')
  }

  buildingCreateQuery(automovel: Automovel): string {
    throw new Error('Method not implemented.')
  }

  async verifyIfAutomovelExists(id: number): Promise<boolean> {
    return this.automoveis.some((automovel) => automovel.id === id)
  }

  async create(automovel: Automovel): Promise<void> {
    this.automoveis.push({ ...automovel, id: (this.mockId += 1) })
  }

  async update(id: number, automovel: Partial<Automovel>): Promise<boolean> {
    const index = this.automoveis.findIndex((automovel) => automovel.id === id)
    if (index === -1) {
      return false
    }
    this.automoveis[index] = { ...this.automoveis[index], ...automovel }
    return true
  }

  async findAll(query?: Partial<Automovel>): Promise<Automovel[]> {
    const test = (await this.buildingFindAllQuery(query)) as Automovel[]
    return test
  }

  async findOne(id: number): Promise<Automovel[]> {
    const automovel = this.automoveis.find((automovel) => automovel.id === id)
    if (!automovel) return []
    return [automovel]
  }

  async delete(id: number): Promise<boolean> {
    const automovelExist = await this.verifyIfAutomovelExists(id)
    this.automoveis = this.automoveis.splice(id, 1)
    return automovelExist
  }
}
