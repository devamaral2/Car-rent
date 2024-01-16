import { RegistroService } from '../registro.service'
import { RegistroInMemoryRepository } from '../repositories/registro.in-memory.repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { AutomovelService } from 'src/app/automovel/automovel.service'
import { AutomovelInMemoryRepository } from 'src/app/automovel/repositories/automovel.in-memory.repository'
import { MotoristaInMemoryRepository } from 'src/app/motorista/repositories/motorista.in-memory.repository'
import { MotoristaService } from 'src/app/motorista/motorista.service'
import {
  registeredAutomoveisMock,
  registeredMotoristasMock,
  registrosMock,
} from './registro.mock'

describe('RegistroService', () => {
  let service: RegistroService
  let automovelService: AutomovelService
  let motoristaService: MotoristaService

  beforeEach(() => {
    const registroRepository = new RegistroInMemoryRepository()
    const automovelInMemoryRepository = new AutomovelInMemoryRepository()
    automovelService = new AutomovelService(automovelInMemoryRepository)
    const motoristaInMemoryRepository = new MotoristaInMemoryRepository()
    motoristaService = new MotoristaService(motoristaInMemoryRepository)

    service = new RegistroService(
      registroRepository,
      automovelService,
      motoristaService,
    )
  })

  it('Deve criar um novo registro e também exibir todos os registros do repositório', async () => {
    await automovelService.create(registeredAutomoveisMock[0])
    await motoristaService.create(registeredMotoristasMock[0])

    await service.create(registrosMock[0])

    const registros = await service.findAll()

    expect(registros).toHaveLength(1)
    expect(registros[0]).toEqual({ ...registrosMock[0], id: 1 })
  })

  it('Não deve criar um registro se motorista não esta na base de dados', async () => {
    await automovelService.create(registeredAutomoveisMock[0])
    await expect(service.create(registrosMock[0])).rejects.toThrow(
      'Motorista não encontrado, definedStatusCode: 404',
    )
  })

  it('Não deve criar um registro se o automovel não esta na base de dados', async () => {
    await motoristaService.create(registeredMotoristasMock[1])
    await expect(service.create(registrosMock[0])).rejects.toThrow(
      'Automovel não encontrado, definedStatusCode: 404',
    )
  })

  it('Não deve criar um registro caso o motorista já tenha alugado outro automovel', async () => {
    const conflictedMock = {
      descricao: 'Conflicted',
      data_inicio: '2022-02-01',
      id_automovel: 2,
      id_motorista: 1,
    }
    await automovelService.create(registeredAutomoveisMock[0])
    await automovelService.create(registeredAutomoveisMock[1])
    await motoristaService.create(registeredMotoristasMock[0])
    await service.create(registrosMock[0])

    expect(async () => await service.create(conflictedMock)).rejects.toThrow(
      'O automóvel já está alugado, definedStatusCode: 409',
    )
  })

  it('Não deve criar um registro caso o automovel já esteja alugado', async () => {
    const conflictedMock = {
      descricao: 'Conflicted',
      data_inicio: '2022-02-01',
      id_automovel: 1,
      id_motorista: 2,
    }
    await automovelService.create(registeredAutomoveisMock[0])
    await motoristaService.create(registeredMotoristasMock[0])
    await motoristaService.create(registeredMotoristasMock[1])
    await service.create(registrosMock[0])

    expect(async () => await service.create(conflictedMock)).rejects.toThrow(
      'O automóvel já está alugado, definedStatusCode: 409',
    )
  })

  it('Deve finalizar um registro existente', async () => {
    await automovelService.create(registeredAutomoveisMock[0])
    await motoristaService.create(registeredMotoristasMock[0])
    await service.create(registrosMock[0])
    await service.endingRegistro(1, '2024-01-02')
    const registros = await service.findAll()
    expect(registros[0].data_termino).toBe('2024-01-02')
  })

  it('Não deve finalizar um registro que já foi finalizado', async () => {
    await automovelService.create(registeredAutomoveisMock[0])
    await motoristaService.create(registeredMotoristasMock[0])
    await service.create(registrosMock[0])
    await service.endingRegistro(1, '2022-01-02')
    await expect(
      async () => await service.endingRegistro(1, '2022-01-03'),
    ).rejects.toThrow('Registro já finalizado, definedStatusCode: 409')
  })

  it('Não deve finalizar um registro que não existe', async () => {
    await expect(service.endingRegistro(999, '2022-01-02')).rejects.toThrow(
      'Registro não encontrado',
    )
  })
})
