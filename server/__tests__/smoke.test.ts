import app from "../app";
import request from "supertest";
describe("Server Smoke test", () => {
  it("should connect to the server", async () => {
    const response = await request(app).get("/hello");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello world!!!");
  });
});
