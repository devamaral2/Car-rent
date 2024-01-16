import { Automovel } from './entities/automovel'
import { automovelVerifier } from './automovelVerifiers'
import { throwErrorHandler } from '../utils/throwErrorHandler'
import { IAutomovelRepository } from './repositories/interface/automovel.interface.repository'

export class AutomovelService {
  constructor(private readonly repository: IAutomovelRepository) {
    this.repository = repository
  }

  async create(body: Automovel): Promise<void> {
    try {
      const automovel = automovelVerifier(body, 'create')
      await this.repository.create(automovel)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async update(id: number, body: Partial<Automovel>): Promise<void> {
    try {
      const automovel = automovelVerifier(body, 'update')
      const automovelExist = await this.repository.update(id, automovel)
      if (!automovelExist)
        throwErrorHandler(new Error('Automovel não encontrado'))
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async findAll(query?: Partial<Automovel>): Promise<Automovel[]> {
    try {
      const finalQuery = automovelVerifier(query)
      return this.repository.findAll(finalQuery)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async findOne(id: number): Promise<Automovel> {
    try {
      const automovel = await this.repository.findOne(id)
      if (!automovel.length)
        throwErrorHandler(new Error('Automovel não encontrado'))
      return automovel[0]
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const autmovelExist = await this.repository.delete(id)
      if (!autmovelExist)
        throwErrorHandler(new Error('Automovel não encontrado'))
      await this.repository.delete(id)
    } catch (e) {
      throwErrorHandler(e)
    }
  }
}
