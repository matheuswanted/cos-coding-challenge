import { inject, injectable } from "inversify";
import { IViewPort } from "./services/ViewPort/interface/IViewPort";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { ICarOnSaleAdapter } from "./services/CarOnSaleAdapter/interface/ICarOnsaleAdapter";
import { AuctionStatisticsAggregate } from "./domain/AuctionStatisticsAggregate/classes/AuctionStatisticsAggregate";
import { IAuctionStatisticsAggregate } from "./domain/AuctionStatisticsAggregate/interface/IAuctionStatisticsAggregate";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.VIEW_PORT) private viewPort: IViewPort,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private client: ICarOnSaleClient,
        @inject(DependencyIdentifier.CAR_ON_SALE_ADAPTER) private adapter: ICarOnSaleAdapter) {
    }

    public async start(): Promise<void> {
        this.viewPort.start();
        this.viewPort.retrieving();
        const auctions = await this.client.getRunningAuctions();

        this.viewPort.collecting();
        const aggregate: IAuctionStatisticsAggregate = new AuctionStatisticsAggregate();

        auctions.items.forEach(a => {
            aggregate.addAuction(this.adapter.adapt(a));
        });

        this.viewPort.result(aggregate);
    }
}
