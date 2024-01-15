import { IMotoristaFindAllQueryDTO } from './entities/dto/motoristaFindAllQuery.dto'
import { MotoristaService } from './motorista.service'
import { Response, Request, NextFunction } from 'express'

export class MotoristaController {
  constructor(private readonly service: MotoristaService) {
    this.service = service
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { body } = req
      await this.service.create(body)
      res.status(201).json({ message: 'Motorista criado' })
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
      await this.service.update(id, body)
      res.status(200).json({ message: 'Motorista atualizado com sucesso!' })
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
      const query: IMotoristaFindAllQueryDTO = req.query
      const motoristas = await this.service.findAll(query)
      res.status(200).json(motoristas)
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
      const motorista = await this.service.findOne(id)
      res.status(200).json(motorista)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        params: { id },
      } = req
      await this.service.delete(id)
      res.status(200).json({ message: 'Motorista deletado com sucesso!' })
    } catch (error) {
      next(error)
    }
  }
}
