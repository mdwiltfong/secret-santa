import app from "../app";
import request from "supertest";

test("GET /", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello world!!!");
});
