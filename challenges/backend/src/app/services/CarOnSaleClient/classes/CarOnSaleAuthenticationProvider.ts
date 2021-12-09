import { AxiosError, AxiosInstance } from "axios";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";
import { ICarOnsaleApiAuthenticationHeaders, ICarOnSaleApiConfig, ICarOnSaleAuthenticationProvider } from "../interface/ICarOnSaleClient";
import "reflect-metadata";


@injectable()
export class CarOnSaleAuthenticationProvider implements ICarOnSaleAuthenticationProvider {
    private readonly httpClient: AxiosInstance;
    public constructor(
        @inject(DependencyIdentifier.HTTP_CLIENT_FACTORY) httpClientFactory: () => AxiosInstance,
        @inject(DependencyIdentifier.CAR_ON_SALE_API_CONFIG) private readonly config: ICarOnSaleApiConfig,
        @inject(DependencyIdentifier.LOGGER) private readonly logger: ILogger
    ) {
        this.httpClient = httpClientFactory();
    }

    public async provideAuthentication(): Promise<ICarOnsaleApiAuthenticationHeaders> {
        try {
            const { data } = await this.httpClient
                .put(`/api/v1/authentication/${this.config.apiUser}`, { "password": this.config.password });

            return {
                authtoken: data.token,
                userid: data.userId
            };
        } catch (e) {
            const { response } = e as AxiosError;
            this.logger.error(`Exiting after COS authentication failure: ${response?.data.message}`);
            process.exit(1);
        }
    }
}
