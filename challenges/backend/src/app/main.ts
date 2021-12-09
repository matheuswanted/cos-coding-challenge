import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { ICarOnSaleApiConfig, IHttpClientFactory } from "./services/CarOnSaleClient/interface/IHttpFactory";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { HttpClientFactory } from "./services/CarOnSaleClient/classes/HttpClientFactory";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
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
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IHttpClientFactory>(DependencyIdentifier.HTTP_FACTORY).to(HttpClientFactory);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);


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
