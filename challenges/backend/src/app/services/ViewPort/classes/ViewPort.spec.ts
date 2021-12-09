import { IMock, Mock, Times } from "typemoq";
import { IAuctionStatisticsAggregate } from "../../../domain/AuctionStatisticsAggregate/interface/IAuctionStatisticsAggregate";
import { ILogger } from "../../Logger/interface/ILogger";
import { IViewPort } from "../interface/IViewPort";
import { ViewPort } from "./ViewPort";
import "reflect-metadata";

describe('ViewPort Tests', () => {
    let logger: IMock<ILogger>;
    let underTest: IViewPort;

    beforeEach(() => {
        logger = Mock.ofType<ILogger>();
        underTest = new ViewPort(logger.object);
    });

    it("Should format 1 to 100.00%", async () => {
        const aggregate = Mock.ofType<IAuctionStatisticsAggregate>();

        aggregate.setup(a => a.getAverageNumberOfBids()).returns(() => 5);
        aggregate.setup(a => a.getAverageProgress()).returns(() => 1);
        aggregate.setup(a => a.getNumberOfAuctions()).returns(() => 3);

        underTest.result(aggregate.object);

        logger.verify(l => l.log(`
        Number of auctions: 3
        Average Number of Bids: 5
        Average progress: 100.00%`), Times.once());
    });

    it("Should format 0.566789 to 56.68%", async () => {
        const aggregate = Mock.ofType<IAuctionStatisticsAggregate>();

        aggregate.setup(a => a.getAverageNumberOfBids()).returns(() => 10);
        aggregate.setup(a => a.getAverageProgress()).returns(() => 0.566789);
        aggregate.setup(a => a.getNumberOfAuctions()).returns(() => 7);

        underTest.result(aggregate.object);

        logger.verify(l => l.log(`
        Number of auctions: 7
        Average Number of Bids: 10
        Average progress: 56.68%`), Times.once());
    });
});