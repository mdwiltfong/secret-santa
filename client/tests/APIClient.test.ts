import { describe, test, expect } from "vitest";
import APIClient from "../src/util/APIClient";
import mocks from "./mocks/mockObjects";
const apiClient = new APIClient();

describe("APIClient tests", () => {
  test("Client is able to call on /hello", async () => {
    const response = await apiClient.get("/hello");
    expect(response.status).toBe(200);
    expect(response.data).toBe("Hello world!!!");
  });
  //TODO: @mdwiltfong -> Is it correct that the response can possible be undefined? This is because there is a chance that the function can throw an error.
  test.skip("Client is able to register user successfully", async () => {
    const response = await apiClient.post("/auth/register", mocks.mockUsers[0]);
    expect(response.status).toBe(200);
  });
  test.todo(
    "Client fails to register a user when they provide an already existing email"
  );
  test.todo("Client is able to login successfully");
  test.todo(
    "Client is able to throw error when not able to login successfully"
  );
});
