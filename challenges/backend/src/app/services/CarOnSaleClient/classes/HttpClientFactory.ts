import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";
import { ICarOnSaleApiConfig, IHttpClientFactory } from "../interface/IHttpFactory";

@injectable()
export class HttpClientFactory implements IHttpClientFactory {
    public constructor(
        @inject(DependencyIdentifier.CAR_ON_SALE_API_CONFIG) private readonly config: ICarOnSaleApiConfig,
        @inject(DependencyIdentifier.LOGGER) private readonly logger: ILogger
    ) { }

    public createHttpClient(): AxiosInstance {
        const client = this.createCarOnSaleClient();

        client.interceptors.request.use(this.authorizationInterceptor());

        return client;
    }

    private createCarOnSaleClient(): AxiosInstance {
        return axios.create({
            baseURL: this.config.url,
            headers: {
                "Accept": "application/json"
            }
        });
    }

    private authorizationInterceptor(): (value: AxiosRequestConfig) => Promise<AxiosRequestConfig> {
        const authenticationClient = this.createCarOnSaleClient();

        return async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
            try {
                const { data } = await authenticationClient
                    .put(`/v1/authentication/${this.config.apiUser}`, { "password": this.config.password });

                request.headers = {
                    ...(request.headers || {}),
                    authtoken: data.token,
                    userid: data.userid
                };

                return request;
            } catch(e) {
                const { response } = e as AxiosError;
                this.logger.error(`Exiting after COS authentication failure: ${response?.data.message}`);
                process.exit(1);
            }
        }
    }
}