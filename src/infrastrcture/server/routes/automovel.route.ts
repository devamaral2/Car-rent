import { Router, Request, Response, NextFunction } from 'express'
import { AutomovelFactory } from 'src/app/automovel/automovel.factory'

const routes: Router = Router()
const automovel = AutomovelFactory.create()

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  automovel.findAll(req, res, next)
})

export default routes
