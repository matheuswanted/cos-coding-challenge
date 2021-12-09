import { IMock, Mock } from "typemoq";
import { expect } from "chai";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { IAuctionResponse, ICarOnsaleApiAuthenticationHeaders, ICarOnSaleAuthenticationProvider, IPage } from "../interface/ICarOnSaleClient";
import { AxiosInstance, AxiosResponse } from "axios";

describe('CarOnsaleClient Tests', () => {
    let axiosInstance: IMock<AxiosInstance>;
    let authProvider: IMock<ICarOnSaleAuthenticationProvider>;
    let underTest: CarOnSaleClient;

    before(() => {
        axiosInstance = Mock.ofType<AxiosInstance>();
        authProvider = Mock.ofType<ICarOnSaleAuthenticationProvider>();
        underTest = new CarOnSaleClient(() => axiosInstance.object, authProvider.object);
    });

    it("Should call /api/v2/auction/buyer", async () => {
        const authHeaders: ICarOnsaleApiAuthenticationHeaders = {
            authtoken: "token",
            userid: "123"
        };
        const data: IPage<IAuctionResponse> = {
            items: [],
            page: 1,
            total: 1
        };

        authProvider
            .setup(a => a.provideAuthentication())
            .returns(() => Promise.resolve(authHeaders));

        axiosInstance
            .setup(a => a.get(`/api/v2/auction/buyer`, { headers: { ...authHeaders } }))
            .returns(() => Promise.resolve({ data } as AxiosResponse));

        const response = await underTest.getRunningAuctions();
        expect(response).to.be.eq(data);
    });
});