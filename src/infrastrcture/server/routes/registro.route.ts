import { Router, Request, Response, NextFunction } from 'express'
import { RegistroFactory } from 'src/app/registro/registro.factory'

const routes: Router = Router()
const registro = RegistroFactory.create()

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  registro.findAll(req, res, next)
})
routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  registro.create(req, res, next)
})
routes.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  registro.endingRegistro(req, res, next)
})

export default routes
