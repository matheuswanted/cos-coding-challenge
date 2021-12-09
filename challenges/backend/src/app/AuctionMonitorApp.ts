import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { ICarOnSaleAdapter } from "./services/CarOnSaleAdapter/interface/ICarOnsaleAdapter";
import { AuctionStatisticsAggregate } from "./domain/AuctionStatisticsAggregate/classes/AuctionStatisticsAggregate";
import { IAuctionStatisticsAggregate } from "./domain/AuctionStatisticsAggregate/interface/IAuctionStatisticsAggregate";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private client: ICarOnSaleClient,
        @inject(DependencyIdentifier.CAR_ON_SALE_ADAPTER) private adapter: ICarOnSaleAdapter) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);

        this.logger.log(`Retrieving running auctions.`);
        const auctions = await this.client.getRunningAuctions();

        this.logger.log(`Collecting statistics about running auctions.`)
        const aggregate: IAuctionStatisticsAggregate = new AuctionStatisticsAggregate();

        auctions.items.forEach(a => {
            aggregate.addAuction(this.adapter.adapt(a));
        });

        this.logger.log(`
        Number of auctions: ${aggregate.getNumberOfAuctions()}
        Average Number of Bids: ${aggregate.getAverageNumberOfBids()}
        Average progress: ${aggregate.getAverageProgress()}`)
    }
}
