import express from 'express';
import { Migration } from '../database/migration';
import { Connection } from '../database/connection';
// import errorMiddleware from './middlewares/errorMiddleware';
// import * as Routes from './routes';

class Bootstrap {
    public app: express.Express;

    constructor() {
        this.databaseStart();
        this.app = express();
        this.config();
        this.routes();
        this.app.get('/', (req, res) => {
            res.send('Ok');
        });
    }

    private databaseStart(): void {
        const db = Connection.connect();
        Migration.generateTables(db);
    }

    private config(): void {
        const accessControl: express.RequestHandler = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Methods',
                'GET,POST,PATCH, DELETE'
            );
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
    }

    private routes(): void {
        this.app.use(express.json());

        // this.app.use('/login', Routes.login);
        // this.app.use('/benefits', Routes.benefits);
        // this.app.use(errorMiddleware);
    }

    public start(port: string): void {
        this.app.listen(port, () => {
            console.log(`Running on port ${port}`);
        });
    }
}

export { Bootstrap };
export const { app } = new Bootstrap();
