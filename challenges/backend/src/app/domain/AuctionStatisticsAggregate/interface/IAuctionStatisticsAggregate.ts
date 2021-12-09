
export interface IAuctionStatisticsAggregate {
    addAuction(auction: IAuction): void;
}

export interface IAuction {
    id: string;
    label: string;
    numberOfBids: string;
    highestBid: string;
}