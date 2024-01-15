import { Automovel } from '../entities/automovel'
import { IAutomovelFindAllQueryDTO } from '../entities/dto/automovelFindlAllQuery.dto'
import { IAutomovelUpdateDTO } from '../entities/dto/automovelUpdate.dto'

export interface IAutomovelRepository {
  buildingFindAllQuery(query?: IAutomovelFindAllQueryDTO): string | Automovel[]
  buildingUpdateQuery(id: number, automovel: IAutomovelUpdateDTO): string
  buildingCreateQuery(automovel: Automovel): string
  verifyIfAutomovelExists(id: number): Promise<boolean>
  create(automovel: Automovel): Promise<void>
  update(id: number, automovel: IAutomovelUpdateDTO): Promise<boolean>
  findAll(query: IAutomovelFindAllQueryDTO): Promise<Automovel[]>
  findOne(id: number): Promise<Automovel[]>
  delete(id: number): Promise<boolean>
}
