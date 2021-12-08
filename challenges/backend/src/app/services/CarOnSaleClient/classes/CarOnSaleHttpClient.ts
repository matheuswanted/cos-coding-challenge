import { IAuctionResponse, ICarOnSaleClient, IPage } from '../interface/ICarOnSaleClient'

export class CarOnSaleHttpClient implements ICarOnSaleClient {
    getRunningAuctions(): Promise<IPage<IAuctionResponse>> {
        return Promise.resolve({
            items: [],
            total: 0,
            page: 1
        });
    }
}