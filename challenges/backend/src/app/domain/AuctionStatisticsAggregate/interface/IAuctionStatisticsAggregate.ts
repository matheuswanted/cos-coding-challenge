
export interface IAuctionStatisticsAggregate {
    getAverageProgress(): number;
    getNumberOfAuctions(): number;
    getAverageNumberOfBids(): number;
    addAuction(auction: IAuction): void;
}

export interface IAuction {
    id: string;
    label: string;
    numberOfBids: number;
    minimunBidRequired?: number;
    highestBid: number;
}