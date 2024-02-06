import {describe,test} from "vitest"
import APIClient from "../src/util/APIClient"
const apiClient = new APIClient();

describe("APIClient tests", ()=> {
    test.todo("Client is able to call on /", async () => {
        const response = await apiClient.get('/');
        expect(response.status).toBe(200);
    });

    test.todo("Client is able to register user successfully")
    test.todo("Client fails to register a user when they provide an already existing email")
    test.todo("Client is able to login successfully")
    test.todo("Client is able to throw error when not able to login successfully")

});