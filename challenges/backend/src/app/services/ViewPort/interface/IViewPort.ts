import { IAuctionStatisticsAggregate } from "../../../domain/AuctionStatisticsAggregate/interface/IAuctionStatisticsAggregate";

export interface IViewPort {
    start(): void;
    retrieving(): void;
    collecting(): void;
    result(aggregate: IAuctionStatisticsAggregate): void;
}