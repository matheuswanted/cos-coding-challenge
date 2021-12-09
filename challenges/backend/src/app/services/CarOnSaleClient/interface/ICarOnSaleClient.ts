/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
    getRunningAuctions(): Promise<IPage<IAuctionResponse>>
}

export interface ICarOnSaleAuthenticationProvider {
    provideAuthentication(): Promise<ICarOnsaleApiAuthenticationHeaders>;
}

export interface ICarOnSaleApiConfig {
    url: string;
    apiUser: string;
    password: string;
}

export interface ICarOnsaleApiAuthenticationHeaders {
    authtoken: string;
    userid: string;
}

export interface IAuctionResponse {
    id: string;
    label: string;
    minimumRequiredAsk?: number;
    currentHighestBidValue: number;
    numBids: number;
}

export interface IPage<T> {
    items: T[];
    page: number;
    total: number;
}
