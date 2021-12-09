import { AxiosInstance } from "axios";

export interface IHttpClientFactory {
    createHttpClient(): AxiosInstance;
}

export interface ICarOnSaleApiConfig {
    url: string;
    apiUser: string;
    password: string;
}