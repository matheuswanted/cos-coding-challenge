import { injectable, inject } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { IAuctionStatisticsAggregate } from "../../../domain/AuctionStatisticsAggregate/interface/IAuctionStatisticsAggregate";
import { ILogger } from "../../Logger/interface/ILogger";
import { IViewPort } from "../interface/IViewPort";
import "reflect-metadata";

@injectable()
export class ViewPort implements IViewPort {
    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    ) { }

    public start(): void {
        this.logger.log(`Auction Monitor started.`);
    }

    public retrieving(): void {
        this.logger.log(`Retrieving running auctions.`);
    }

    public collecting(): void {
        this.logger.log(`Collecting statistics about running auctions.`);
    }

    public result(aggregate: IAuctionStatisticsAggregate): void {
        this.logger.log(`
        Number of auctions: ${aggregate.getNumberOfAuctions()}
        Average Number of Bids: ${aggregate.getAverageNumberOfBids()}
        Average progress: ${this.formatPercentage(aggregate.getAverageProgress())}`);
    }

    private formatPercentage(value: number): string {
        const rounded = Math.round(value*10000);
        const percentage = `${rounded/100}`;
        return `${Number.parseFloat(percentage).toFixed(2)}%`;
    }
}