import { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";
import { IAuctionResponse, ICarOnSaleAuthenticationProvider, ICarOnSaleClient, IPage } from "../interface/ICarOnSaleClient"
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    private readonly httpClient: AxiosInstance;
    public constructor(
        @inject(DependencyIdentifier.HTTP_CLIENT_FACTORY) httpClientFactory: () => AxiosInstance,
        @inject(DependencyIdentifier.CAR_ON_SALE_AUTH_PROVIDER) private readonly authProvider: ICarOnSaleAuthenticationProvider
    ) {
        this.httpClient = httpClientFactory();
    }

    public async getRunningAuctions(): Promise<IPage<IAuctionResponse>> {
        // TODO add error handling
        const auth = await this.authProvider.provideAuthentication();

        const { data } = await this.httpClient.get("/api/v2/auction/buyer/", { headers: { ...auth } });

        return data as IPage<IAuctionResponse>;
    }
}