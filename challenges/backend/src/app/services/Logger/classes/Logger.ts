import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {

    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
    public error(message: string): void {
        throw new Error(`[ERROR]: ${message}`);
    }

}