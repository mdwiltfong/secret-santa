import app from "../app";
import request from "supertest";
import { DatabaseClient } from "../prisma";
import { error } from "console";
beforeAll(async () => {
  Promise.all([
    await DatabaseClient.clearTable("Users"),
    await DatabaseClient.clearTable("Gifts"),
  ]);
});
/* afterAll(async () => {
  Promise.all([
    await DatabaseClient.clearTable("Users"),
    await DatabaseClient.clearTable("Gifts"),
  ]);
}); */
describe("Server Authorization Tests", () => {
  it("registering a user should return a token", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "testUser123@email.com",
      password: "password",
      firstName: "Michael",
      lastName: "Wiltfong",
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ token: expect.any(String) });
  });
  it("user can login with username and password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testUser123@email.com",
      password: "password",
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ token: expect.any(String) });
  });
  it("unregistered user cannot login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "unregisteredUser@email.com",
      password: "password",
    });
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: "No user associated with that email",
    });
  });
});
