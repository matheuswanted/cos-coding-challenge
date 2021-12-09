import { IAuction } from "../../../domain/AuctionStatisticsAggregate/interface/IAuctionStatisticsAggregate";
import { IAuctionResponse } from "../../CarOnSaleClient/interface/ICarOnSaleClient"

export interface ICarOnSaleAdapter {
    adapt(response: IAuctionResponse): IAuction;
}