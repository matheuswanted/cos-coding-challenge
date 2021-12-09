import { IAuction, IAuctionStatisticsAggregate } from "../interface/IAuctionStatisticsAggregate";

export class AuctionStatisticsAggregate implements IAuctionStatisticsAggregate {
    private numberOfBids: number = 0;
    private numberOfAuctions: number = 0
    private cumulativeProgress: number = 0

    public getAverageProgress(): number {
        return this.cumulativeProgress / this.numberOfAuctions;
    }
    public getNumberOfAuctions(): number {
        return this.numberOfAuctions;
    }
    public getAverageNumberOfBids(): number {
        return this.numberOfBids / this.numberOfAuctions;
    }
    public addAuction(auction: IAuction): void {
        this.numberOfAuctions++;
        this.numberOfBids += auction.numberOfBids;
        this.cumulativeProgress += auction.highestBid / (auction.minimunBidRequired || 1);
    }
}