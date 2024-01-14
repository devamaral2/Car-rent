import { Automovel } from './entities/automovel'
import { IAutomovelFindAllQueryDTO } from './entities/dto/automovel-findlAll-query.dto'
import { AutomovelRepository } from './automovel.repository'
import { automovelFindAllQueryDTOVerifier } from './utils/automovelFindAllQueryDTO.verifier'
export class AutomovelService {
  constructor(private readonly repository: AutomovelRepository) {
    this.repository = repository
  }

  async findAll(query: IAutomovelFindAllQueryDTO): Promise<Automovel[]> {
    try {
      const finalQuery = automovelFindAllQueryDTOVerifier(query)
      return this.repository.findAll(finalQuery)
    } catch (e) {
      const error = e?.message ? e.message : e.errors[0].message
      throw new Error(`${error}, definedStatusCode: 400`)
    }
  }

  //   async create(automovel: Automovel): Promise<Automovel> {
  //     const createdAutomovel = new this.automovelModel(automovel)
  //     return createdAutomovel.save()
  //   }

  //   async findOne(placa: string): Promise<Automovel | null> {
  //     return this.automovelModel.findOne({ placa }).exec()
  //   }

  //   async updateOne(placa: string, automovel: Automovel): Promise<Automovel> {
  //     return this.automovelModel.findOneAndUpdate({ placa }, automovel).exec()
  //   }

  //   async deleteOne(placa: string): Promise<Automovel | null> {
  //     return this.automovelModel.findOneAndDelete({ placa }).exec()
  //   }
}
