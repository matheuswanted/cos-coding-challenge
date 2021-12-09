import { IMock, Mock } from "typemoq";
import { expect } from "chai";
import { ICarOnSaleApiConfig } from "../interface/ICarOnSaleClient";
import { AxiosInstance, AxiosResponse } from "axios";
import { CarOnSaleAuthenticationProvider } from "./CarOnSaleAuthenticationProvider";
import { ILogger } from "../../Logger/interface/ILogger";

describe('CarOnSaleAuthenticationProvider Tests', () => {
    let axiosInstance: IMock<AxiosInstance>;
    let config: IMock<ICarOnSaleApiConfig>;
    let logger: IMock<ILogger>;
    let underTest: CarOnSaleAuthenticationProvider;

    before(() => {
        axiosInstance = Mock.ofType<AxiosInstance>();
        config = Mock.ofType<ICarOnSaleApiConfig>();
        logger = Mock.ofType<ILogger>();
        underTest = new CarOnSaleAuthenticationProvider(() => axiosInstance.object, config.object, logger.object);
    });

    it("Should call /api/v1/authentication and return auth token", async () => {
        const data = {
            token: "token",
            userId: "1234"
        };

        config.setup(c => c.apiUser).returns(() => "test@email.com");
        config.setup(c => c.password).returns(() => "123");

        axiosInstance
            .setup(a => a.put(`/api/v1/authentication/test@email.com`, { "password": "123" }))
            .returns(() => Promise.resolve({ data } as AxiosResponse));

        const response = await underTest.provideAuthentication();
        expect(response).not.to.be.null;
        expect(response.authtoken).to.be.eq("token");
        expect(response.userid).to.be.eq("1234");
    });
});