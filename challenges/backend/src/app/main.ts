import axios, { AxiosInstance } from "axios";
import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { ICarOnSaleAdapter } from "./services/CarOnSaleAdapter/interface/ICarOnsaleAdapter";
import { CarOnSaleAdapter } from "./services/CarOnSaleAdapter/classes/CarOnsaleAdapter";
import { ICarOnSaleApiConfig, ICarOnSaleAuthenticationProvider, ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import { CarOnSaleAuthenticationProvider } from "./services/CarOnSaleClient/classes/CarOnSaleAuthenticationProvider";
import { IViewPort } from "./services/ViewPort/interface/IViewPort";
import { ViewPort } from "./services/ViewPort/classes/ViewPort";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Add Configurations.
 */
container.bind<ICarOnSaleApiConfig>(DependencyIdentifier.CAR_ON_SALE_API_CONFIG).toConstantValue({
    url: "https://api-core-dev.caronsale.de",
    apiUser: "buyer-challenge@caronsale.de",
    password: "Test123."
})

/*
 * Register dependencies in DI environment.
 */
container.bind<AxiosInstance>(DependencyIdentifier.HTTP_CLIENT_FACTORY).toFactory(context => _ => {
    const config = context.container.get<ICarOnSaleApiConfig>(DependencyIdentifier.CAR_ON_SALE_API_CONFIG);
    return axios.create({
        baseURL: config.url
    });
});
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IViewPort>(DependencyIdentifier.VIEW_PORT).to(ViewPort);
container.bind<ICarOnSaleAdapter>(DependencyIdentifier.CAR_ON_SALE_ADAPTER).to(CarOnSaleAdapter);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<ICarOnSaleAuthenticationProvider>(DependencyIdentifier.CAR_ON_SALE_AUTH_PROVIDER).to(CarOnSaleAuthenticationProvider);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
