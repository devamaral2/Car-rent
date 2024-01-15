import { Automovel } from '../entities/automovel'
import { IAutomovelFindAllQueryDTO } from '../entities/dto/automovelFindlAllQuery.dto'
import { IAutomovelUpdateDTO } from '../entities/dto/automovelUpdate.dto'
import { IAutomovelRepository } from './automovel.interface.repository'

export class AutomovelInMemoryRepository implements IAutomovelRepository {
  public automoveis: Automovel[] = []
  private mockId = 0

  buildingFindAllQuery(
    query?: IAutomovelFindAllQueryDTO,
  ): Automovel[] | string {
    return this.automoveis.filter((automovel) => {
      return Object.entries(query).every(([key, value]) => {
        return automovel[key] === value
      })
    })
  }

  buildingUpdateQuery(id: number, automovel: IAutomovelUpdateDTO): string {
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

  async update(id: number, automovel: IAutomovelUpdateDTO): Promise<boolean> {
    const index = this.automoveis.findIndex((automovel) => automovel.id === id)
    if (index === -1) {
      return false
    }
    this.automoveis[index] = { ...this.automoveis[index], ...automovel }
    return true
  }

  async findAll(query?: IAutomovelFindAllQueryDTO): Promise<Automovel[]> {
    return this.buildingFindAllQuery(query) as Automovel[]
  }

  async findOne(id: number): Promise<Automovel[]> {
    const automovel = this.automoveis.find((automovel) => automovel.id === id)
    return [automovel]
  }

  async delete(id: number): Promise<boolean> {
    const automovelExist = await this.verifyIfAutomovelExists(id)

    this.automoveis = this.automoveis.filter((automovel) => automovel.id !== id)

    return automovelExist
  }
}
