import { AutomovelService } from '../automovel.service'
import { describe, it, expect, beforeEach } from 'vitest'
import { AutomovelInMemoryRepository } from '../repositories/automovel.in-memory.repository'
import {
  automoveisIncompleteMock,
  automoveisMock,
  automovelFormatedMock,
} from './automovel.mock'
import { automovelVerifier } from '../automovelVerifiers'

describe('Testes para automovel', () => {
  let service: AutomovelService

  beforeEach(() => {
    const inMemory = new AutomovelInMemoryRepository()
    service = new AutomovelService(inMemory)
  })

  it('Deve criar um novo automovel e formatar as informações oferecidas pelo usuário', async () => {
    service.create(automoveisMock[0])
    const foundAutomovel = await service.findOne(1)
    expect(foundAutomovel).toEqual({ ...automovelFormatedMock, id: 1 })
  })

  it('Caso esteja faltando um campo, ao criar um automovel a aplicação vai lançar um erro', async () => {
    expect(
      async () => await service.create(automoveisIncompleteMock[0]),
    ).rejects.toThrow('A marca é um campo obrigatório')
    expect(
      async () => await service.create(automoveisIncompleteMock[1]),
    ).rejects.toThrow('A cor é um campo obrigatório')
    expect(
      async () => await service.create(automoveisIncompleteMock[2]),
    ).rejects.toThrow('A placa é um campo obrigatório')
  })

  it('Não será aceito placas com mais do que 7 caracteres, sem contar o hífen', async () => {
    const mock = { ...automoveisMock[0], placa: 'ABC123455' }
    expect(async () => await service.create(mock)).rejects.toThrow(
      'A placa deve conter 7 caracteres desconsiderando o hífen',
    )
  })

  it('O hífen não será contado como caracter na hora de salvar o automóvel', async () => {
    const mock = { ...automoveisMock[0], placa: 'ABC-1234' }
    expect(async () => await service.create(mock)).not.toThrow()
  })

  it('Deve ser possivel editar o automóvel', async () => {
    await service.create(automoveisMock[0])
    const updatedAutomovel = { ...automoveisMock[0], cor: 'Vermelho' }
    await service.update(1, updatedAutomovel)
    const foundAutomovel = await service.findOne(1)

    expect(foundAutomovel.cor).toBe('vermelho')
  })

  it('Caso o usuário tente editar um automovel com um id inválido a aplicação envia um erro', async () => {
    expect(
      async () => await service.update(1, automoveisMock[0]),
    ).rejects.toThrow('Automovel não encontrado, definedStatusCode: 404')
  })

  it('Uma busca por um automovel especifico deve retornar aquele automovel', async () => {
    automoveisMock.forEach(async (automovel) => {
      await service.create(automovel)
    })
    expect(async () => await service.findOne(10)).rejects.toThrow(
      'Automovel não encontrado, definedStatusCode: 404',
    )
  })

  it('Caso o usuário tente encontrar um automovel com um id inválido a aplicação envia um erro', async () => {
    expect(async () => await service.findOne(10)).rejects.toThrow(
      'Automovel não encontrado, definedStatusCode: 404',
    )
  })

  it('A busca por todos os automoveis funciona corretamente', async () => {
    const result = []
    automoveisMock.forEach(async (automovel, index) => {
      const automovelFormated = automovelVerifier(automovel, 'create')
      result.push({ ...automovelFormated, id: (index += 1) })
      await service.create(automovel)
    })
    const automoveis = await service.findAll()
    expect(automoveis).toEqual(result)
  })

  it('Deve deletar um Automovel existente', async () => {
    await service.create(automoveisMock[0])
    await service.delete(1)
    const foundAutomovel = await service.findAll()
    expect(foundAutomovel.length).toBe(0)
  })

  it('Caso o usuário tente deletar um automovel com um id inválido a aplicação envia um erro', async () => {
    expect(async () => await service.delete(10)).rejects.toThrow(
      'Automovel não encontrado, definedStatusCode: 404',
    )
  })

  it('Deve aparecer todos os automoveis azuis quando o usuário escolhe a query', async () => {
    await service.create(automoveisMock[0])
    await service.create(automoveisMock[1])
    await service.create(automoveisMock[2])
    const foundAutomoveis = await service.findAll({ cor: 'Azul' })
    expect(foundAutomoveis[0].cor).toBe('azul')
    expect(foundAutomoveis[1].cor).toBe('azul')
    expect(foundAutomoveis[2]).toBeUndefined()
  })
})
