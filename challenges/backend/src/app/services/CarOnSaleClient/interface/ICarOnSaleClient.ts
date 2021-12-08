/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
    getRunningAuctions(): Promise<IPage<IAuctionResponse>>
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
