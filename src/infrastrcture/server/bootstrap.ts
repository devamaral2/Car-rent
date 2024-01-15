import express, { NextFunction, Request, Response } from 'express'
import * as Routes from './routes'
import { ErrorMiddleware } from './middlewares/error.middleware'

class Bootstrap {
  public app: express.Express

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    this.app.get('/', (req, res) => {
      res.send('Ok')
    })
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    }
    this.app.use(accessControl)
  }

  private routes(): void {
    this.app.use(express.json())
    this.app.use('/automovel', Routes.automovel)
    this.app.use('/motorista', Routes.motorista)
    this.app.use(
      (error: unknown, req: Request, res: Response, next: NextFunction) =>
        ErrorMiddleware.exec(error, res),
    )
  }

  public start(port: string): void {
    this.app.listen(port, () => {
      console.log(`Running on port ${port}`)
    })
  }
}

export { Bootstrap }
export const { app } = new Bootstrap()
