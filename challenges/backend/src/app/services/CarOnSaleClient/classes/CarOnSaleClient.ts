import { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";
import { IAuctionResponse, ICarOnSaleClient, IPage } from "../interface/ICarOnSaleClient"
import { IHttpClientFactory } from "../interface/IHttpFactory";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    private readonly httpClient: AxiosInstance;
    public constructor(@inject(DependencyIdentifier.HTTP_FACTORY) httpClientFactory: IHttpClientFactory) {
        this.httpClient = httpClientFactory.createHttpClient();
    }

    public getRunningAuctions(): Promise<IPage<IAuctionResponse>> {
        return Promise.resolve({
            items: [],
            total: 0,
            page: 1
        });
    }
}