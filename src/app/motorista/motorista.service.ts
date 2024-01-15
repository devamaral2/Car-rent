import { motoristaVerifier } from './utils/motoristaVerifier'

import { throwErrorHandler } from '../utils/throwErrorHandler'

import { MotoristaRepository } from './motorista.repository'
import { automovelVerifier } from '../automovel/utils/automovelVerifiers'
import { Motorista } from './entities/motorista'
import { IMotoristaFindAllQueryDTO } from './entities/dto/motoristaFindAllQuery.dto'
export class MotoristaService {
  constructor(private readonly repository: MotoristaRepository) {
    this.repository = repository
  }

  async create(body: Motorista): Promise<void> {
    try {
      const motorista = motoristaVerifier(body, 'create')
      await this.repository.create(motorista)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async update(id: string, body: Motorista): Promise<void> {
    try {
      const motorista = motoristaVerifier(body, 'update')
      const motoristaExist = await this.repository.update(id, motorista)
      if (!motoristaExist)
        throwErrorHandler(new Error('Motorista não encontrado'))
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async findAll(query: IMotoristaFindAllQueryDTO): Promise<Motorista[]> {
    try {
      const finalQuery = motoristaVerifier(query, 'findQuery')
      return this.repository.findAll(finalQuery)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async findOne(id: string): Promise<Motorista> {
    try {
      const motorista = await this.repository.findOne(id)
      if (!motorista.length)
        throwErrorHandler(new Error('Motorista não encontrado'))
      return motorista[0]
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const motoristaExist = await this.repository.delete(id)
      if (!motoristaExist)
        throwErrorHandler(new Error('Motorista não encontrado'))
      await this.repository.delete(id)
    } catch (e) {
      throwErrorHandler(e)
    }
  }
}
