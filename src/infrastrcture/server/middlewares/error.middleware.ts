import { Response } from 'express'

export class ErrorMiddleware extends Error {
  public static exec(error: any, res: Response) {
    const message = error?.message
    if (message.includes(', definedStatusCode: ')) {
      const [errorMessage, errorStatus] = message.split(', definedStatusCode: ')
      res.status(Number(errorStatus)).json({ message: errorMessage })
    } else {
      res.status(500).json({ message })
    }
  }
}
