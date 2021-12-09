import { IAuction, IAuctionStatisticsAggregate } from "../interface/IAuctionStatisticsAggregate";

export class AuctionStatisticsAggregate implements IAuctionStatisticsAggregate {
    public getAverageProgress(): number {
        throw new Error("Method not implemented.");
    }
    public getNumberOfAuctions(): number {
        throw new Error("Method not implemented.");
    }
    public getAverageNumberOfBids(): number {
        throw new Error("Method not implemented.");
    }
    public addAuction(auction: IAuction): void {
        throw new Error("Method not implemented.");
    }
}