import { AutomovelService } from './automovel.service'
import { Response, Request, NextFunction } from 'express'
import { Automovel } from './entities/automovel'

export class AutomovelController {
  constructor(private readonly service: AutomovelService) {
    this.service = service
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { body } = req
      await this.service.create(body)
      res.status(201).json({ message: 'Automovel criado' })
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        body,
        params: { id },
      } = req
      await this.service.update(Number(id), body)
      res.status(200).json({ message: 'Automovel atualizado' })
    } catch (error) {
      next(error)
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const query: Partial<Automovel> = req.query
      const automoveis = await this.service.findAll(query)
      res.status(200).json(automoveis)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      const automovel = await this.service.findOne(Number(id))
      res.status(200).json(automovel)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      await this.service.delete(Number(id))
      res.status(200).json({ message: 'Automovel deletado' })
    } catch (error) {
      next(error)
    }
  }
}
