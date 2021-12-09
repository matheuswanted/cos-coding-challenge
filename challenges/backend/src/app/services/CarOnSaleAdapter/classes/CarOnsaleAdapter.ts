import { injectable } from "inversify";
import { IAuction } from "../../../domain/AuctionStatisticsAggregate/interface/IAuctionStatisticsAggregate";
import { IAuctionResponse } from "../../CarOnSaleClient/interface/ICarOnSaleClient"
import { ICarOnSaleAdapter } from "../interface/ICarOnsaleAdapter";
import "reflect-metadata";

@injectable()
export class CarOnSaleAdapter implements ICarOnSaleAdapter {
    public adapt(response: IAuctionResponse): IAuction {
        return {
            id: response.id,
            label: response.label,
            numberOfBids: response.numBids,
            highestBid: response.currentHighestBidValue,
            minimunBidRequired: response.minimumRequiredAsk
        };
    }
}