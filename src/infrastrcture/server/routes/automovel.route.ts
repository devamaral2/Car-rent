import { Router, Request, Response, NextFunction } from 'express'
import { AutomovelFactory } from 'src/app/automovel/automovel.factory'

const routes: Router = Router()
const automovel = AutomovelFactory.create()

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  automovel.findAll(req, res, next)
})
routes.post('/', (req: Request, res: Response, next: NextFunction) => {
  automovel.create(req, res, next)
})
routes.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  automovel.update(req, res, next)
})
routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  automovel.findOne(req, res, next)
})
routes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  automovel.delete(req, res, next)
})

export default routes
