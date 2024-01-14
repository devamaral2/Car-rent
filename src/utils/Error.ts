export class Error {
    errorMessage: string;
    errorStatus: number;
    constructor({ errorMessage, errorStatus }) {
        this.errorMessage = errorMessage;
        this.errorStatus = errorStatus;
    }
}
