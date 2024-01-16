import { Automovel } from '../../entities/automovel'

export interface IAutomovelRepository {
  buildingFindAllQuery(query?: Partial<Automovel>): string | Automovel[]
  buildingUpdateQuery(id: number, automovel: Partial<Automovel>): string
  buildingCreateQuery(automovel: Automovel): string
  verifyIfAutomovelExists(id: number): Promise<boolean>
  create(automovel: Automovel): Promise<void>
  update(id: number, automovel: Partial<Automovel>): Promise<boolean>
  findAll(query: Partial<Automovel>): Promise<Automovel[]>
  findOne(id: number): Promise<Automovel[]>
  delete(id: number): Promise<boolean>
}
