import { Router, Request, Response, NextFunction } from 'express'
import { MotoristaFactory } from 'src/app/motorista/motorista.factory'

const routes: Router = Router()
const motorista = MotoristaFactory.create()

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  motorista.findAll(req, res, next)
})
routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  motorista.create(req, res, next)
})
routes.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  motorista.update(req, res, next)
})
routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  motorista.findOne(req, res, next)
})
routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  motorista.delete(req, res, next)
})

export default routes
