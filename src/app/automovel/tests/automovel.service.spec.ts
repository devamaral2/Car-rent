import { AutomovelService } from '../automovel.service'
import { Automovel } from '../entities/automovel'
import { describe, it, expect, beforeEach } from 'vitest'
import { AutomovelInMemoryRepository } from '../repositories/automovel.in-memory.repository'

describe('AutomovelInMemoryRepository', () => {
  let repository: AutomovelService
  let automovel: Automovel
  let formatedAutomovel: Automovel

  beforeEach(() => {
    const inMemory = new AutomovelInMemoryRepository()
    repository = new AutomovelService(inMemory)

    automovel = { placa: 'ABC1234', cor: 'Azul', marca: 'Ford' }
    formatedAutomovel = { placa: 'abc1234', cor: 'azul', marca: 'ford' }
  })

  it('Deve criar um novo automovel e formatar as informações oferecidas pelo usuário', async () => {
    repository.create(automovel)
    const foundAutomovel = await repository.findOne(1)
    expect(foundAutomovel.cor).toEqual(formatedAutomovel.cor)
    expect(foundAutomovel.marca).toEqual(formatedAutomovel.marca)
    expect(foundAutomovel.placa).toEqual(formatedAutomovel.placa)
  })

  it('Deve ser possivel editar o automóvel', async () => {
    await repository.create(automovel)
    const updatedAutomovel = { ...automovel, cor: 'Vermelho' }

    await repository.update(1, updatedAutomovel)
    const foundAutomovel = await repository.findOne(1)

    expect(foundAutomovel.cor).toBe('vermelho')
  })

  // it('Deve deletar um Automovel existente', async () => {
  //   await repository.create(automovel)
  //   await repository.delete(1)
  //   const foundAutomovel = await repository.findAll()
  //   expect(foundAutomovel).toBeUndefined()
  //   expect(1).toEqual(1)
  // })

  it('Deve aparecer todos os automoveis azuis quando o usuário escolhe a query', async () => {
    const automovel2 = { placa: 'ABC1234', cor: 'Azul', marca: 'Ford' }
    await repository.create(automovel)
    await repository.create(automovel2)
    const foundAutomoveis = await repository.findAll({ cor: 'Azul' })
    console.log(foundAutomoveis)
    expect(foundAutomoveis[0].cor).toBe('azul')
    expect(foundAutomoveis[1].cor).toBe('azul')
  })
})
