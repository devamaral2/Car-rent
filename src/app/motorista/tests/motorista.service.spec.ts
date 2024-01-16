import { MotoristaService } from '../motorista.service'
import { describe, it, expect, beforeEach } from 'vitest'
import { MotoristaInMemoryRepository } from '../repositories/motorista.in-memory.repository'
import { motoristasMock } from './motorista.mock'

describe('Testes para motorista', () => {
  let service: MotoristaService

  beforeEach(() => {
    const inMemory = new MotoristaInMemoryRepository()
    service = new MotoristaService(inMemory)
  })

  it('Deve criar um novo motorista e formatar as informações oferecidas pelo usuário', async () => {
    service.create(motoristasMock[0])
    const foundMotorista = await service.findOne(1)
    expect(foundMotorista).toEqual({ ...motoristasMock[0], id: 1 })
  })

  it('Caso esteja faltando um campo, ao criar um motorista a aplicação vai lançar um erro', async () => {
    expect(async () => await service.create({})).rejects.toThrow(
      'O nome é um campo obrigatório',
    )
  })

  it('Deve ser possivel editar o motorista', async () => {
    await service.create(motoristasMock[0])
    const updatedMotorista = { ...motoristasMock[0], nome: 'João' }
    await service.update(1, updatedMotorista)
    const foundMotorista = await service.findOne(1)

    expect(foundMotorista.nome).toBe('João')
  })

  it('Caso o usuário tente editar um motorista com um id inválido a aplicação envia um erro', async () => {
    expect(
      async () => await service.update(1, motoristasMock[0]),
    ).rejects.toThrow('Motorista não encontrado, definedStatusCode: 404')
  })

  it('Uma busca por um motorista especifico deve retornar aquele motorista', async () => {
    motoristasMock.forEach(async (motorista) => {
      await service.create(motorista)
    })
    expect(async () => await service.findOne(10)).rejects.toThrow(
      'Motorista não encontrado, definedStatusCode: 404',
    )
  })

  it('Caso o usuário tente encontrar um motorista com um id inválido a aplicação envia um erro', async () => {
    expect(async () => await service.findOne(10)).rejects.toThrow(
      'Motorista não encontrado, definedStatusCode: 404',
    )
  })

  it('A busca por todos os motoristas funciona corretamente', async () => {
    const result = []
    motoristasMock.forEach(async (motorista, index) => {
      result.push({ ...motorista, id: (index += 1) })
      await service.create(motorista)
    })
    const motoristas = await service.findAll()

    expect(motoristas).toEqual(result)
  })

  it('Deve deletar um Motorista existente', async () => {
    await service.create(motoristasMock[0])
    await service.delete(1)
    const foundMotorista = await service.findAll()
    expect(foundMotorista.length).toBe(0)
  })

  it('Caso o usuário tente deletar um motorista com um id inválido a aplicação envia um erro', async () => {
    expect(async () => await service.delete(10)).rejects.toThrow(
      'Motorista não encontrado, definedStatusCode: 404',
    )
  })

  it('Deve aparecer todos os motoristas com o nome enviado pela query', async () => {
    await service.create(motoristasMock[0])
    await service.create(motoristasMock[1])
    await service.create(motoristasMock[2])
    const foundAutomoveis = await service.findAll({ nome: 'Ricardo' })
    expect(foundAutomoveis[0].nome).toBe('Ricardo')
    expect(foundAutomoveis[2]).toBeUndefined()
  })
})
