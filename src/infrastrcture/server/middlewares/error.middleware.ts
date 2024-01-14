import { Error } from 'src/utils/Error';
import { Response } from 'express';

export class ErrorMiddleware extends Error {
    public static exec(error: Error, res: Response) {
        console.error(error);
        let response = error;
        if (!(error instanceof Error)) {
            response = {
                errorMessage: 'An unexpected error has occurred',
                errorStatus: 500,
            };
        }
        res.status(response.errorStatus).json(response.errorMessage);
    }
}
