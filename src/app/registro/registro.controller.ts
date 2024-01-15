import { Response, Request, NextFunction } from 'express'
import { RegistroService } from './registro.service'

export class RegistroController {
  constructor(private readonly service: RegistroService) {
    this.service = service
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { body } = req
      await this.service.create(body)
      res.status(201).json({ message: 'Registro criado com sucesso' })
    } catch (error) {
      next(error)
    }
  }

  async endingRegistro(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        body,
        params: { id },
      } = req

      await this.service.endingRegistro(Number(id), body.data_termino)
      res.status(200).json({ message: 'Registro finalizado com sucesso' })
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
      const registros = await this.service.findAll()
      res.status(200).json(registros)
    } catch (error) {
      next(error)
    }
  }
}
