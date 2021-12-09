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
    currentHighestBidValue: number;
    numBids: number;
    /*
    * I made this field nullable due to one record in the api being null even though swagger declares it as non-nullable
    */
    minimumRequiredAsk?: number;
}

export interface IPage<T> {
    items: T[];
    page: number;
    total: number;
}
