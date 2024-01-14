import { Automovel } from './entities/automovel'
import { IAutomovelFindAllQueryDTO } from './entities/dto/automovel-findlAll-query.dto'
import { AutomovelService } from './automovel.service'
import { Response, Request, NextFunction } from 'express'

export class AutomovelController {
  constructor(private readonly repository: AutomovelService) {
    this.repository = repository
  }

  //   async create(automovel: Automovel): Promise<Automovel> {
  //     const createdAutomovel = new this.automovelModel(automovel)
  //     return createdAutomovel.save()
  //   }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const query: IAutomovelFindAllQueryDTO = req.query
      const automoveis = await this.repository.findAll(query)
      res.status(200).json(automoveis)
    } catch (error) {
      next(error)
    }
  }

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
