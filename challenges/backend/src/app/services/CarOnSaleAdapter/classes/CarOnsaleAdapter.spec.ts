import { expect } from "chai";
import { ICarOnSaleAdapter } from "../interface/ICarOnsaleAdapter";
import { CarOnSaleAdapter } from "./CarOnsaleAdapter";

describe('CarOnSaleAdapter Tests', () => {
    let underTest: ICarOnSaleAdapter;

    beforeEach(() => {
        underTest = new CarOnSaleAdapter();
    })

    it("Adapt CarOnSale Api AuctionResponse into Auction domain", async () => {
        const result = underTest.adapt({
            id: "1",
            label: "auction",
            currentHighestBidValue: 10,
            numBids: 2,
            minimumRequiredAsk: 15,
        });

        expect(result).not.to.be.null;
        expect(result.id).to.be.eq("1");
        expect(result.label).to.be.eq("auction");
        expect(result.minimunBidRequired).to.be.eq(15);
        expect(result.numberOfBids).to.be.eq(2);
        expect(result.highestBid).to.be.eq(10);
    });
});
