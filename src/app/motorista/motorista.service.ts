import { motoristaVerifier } from './motoristaVerifier'
import { throwErrorHandler } from '../utils/throwErrorHandler'
import { Motorista } from './entities/motorista'
import { IMotoristaRepository } from './repositories/interface/motorista.interface.repository'
export class MotoristaService {
  constructor(private readonly repository: IMotoristaRepository) {
    this.repository = repository
  }

  async create(body: Motorista): Promise<void> {
    try {
      const motorista = motoristaVerifier(body)
      await this.repository.create(motorista)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async update(id: number, body: Motorista): Promise<void> {
    try {
      const motorista = motoristaVerifier(body)
      const motoristaExist = await this.repository.update(id, motorista)
      if (!motoristaExist)
        throwErrorHandler(new Error('Motorista não encontrado'))
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async findAll(query?: Partial<Motorista>): Promise<Motorista[]> {
    try {
      const finalQuery = motoristaVerifier(query, 'findAll')
      return this.repository.findAll(finalQuery)
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async findOne(id: number): Promise<Motorista> {
    try {
      const motorista = await this.repository.findOne(id)
      if (!motorista.length)
        throwErrorHandler(new Error('Motorista não encontrado'))
      return motorista[0]
    } catch (e) {
      throwErrorHandler(e)
    }
  }

  async delete(id: number): Promise<void> {
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
