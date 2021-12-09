import { expect } from "chai";
import { IAuctionStatisticsAggregate } from "../interface/IAuctionStatisticsAggregate";
import { AuctionStatisticsAggregate } from "./AuctionStatisticsAggregate";

describe('AuctionStatisticsAggregate Tests', () => {
    let underTest: IAuctionStatisticsAggregate;

    beforeEach(() => {
        underTest = new AuctionStatisticsAggregate();
    })

    it("Calculate data of multiple auctions", async () => {
        underTest.addAuction({ id: "1", label: "first auction", numberOfBids: 2, highestBid: 100, minimunBidRequired: 50 });
        expect(underTest.getAverageNumberOfBids()).to.be.eq(2);
        expect(underTest.getNumberOfAuctions()).to.be.eq(1);
        expect(underTest.getAverageProgress()).to.be.eq(2);

        underTest.addAuction({ id: "2", label: "second auction", numberOfBids: 6, highestBid: 100, minimunBidRequired: 200 });
        expect(underTest.getAverageNumberOfBids()).to.be.eq(4);
        expect(underTest.getNumberOfAuctions()).to.be.eq(2);
        expect(underTest.getAverageProgress()).to.be.eq(1.25);
    });

    it("Calculate average progress of an auction without minimun bid", async () => {
        underTest.addAuction({ id: "1", label: "first auction", numberOfBids: 2, highestBid: 1000 });
        expect(underTest.getAverageProgress()).to.be.eq(1000);
    });
});