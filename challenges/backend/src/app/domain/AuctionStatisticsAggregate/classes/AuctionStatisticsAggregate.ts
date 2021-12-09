import { IAuction, IAuctionStatisticsAggregate } from "../interface/IAuctionStatisticsAggregate";

export class AuctionStatisticsAggregate implements IAuctionStatisticsAggregate {
    public addAuction(auction: IAuction): void {
        throw new Error("Method not implemented.");
    }
}