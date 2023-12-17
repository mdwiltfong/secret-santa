import app from "../app";
import request from "supertest";
import { DatabaseClient } from "../prisma";
beforeAll(async () => {
  Promise.all([
    await DatabaseClient.clearTable("Users"),
    await DatabaseClient.clearTable("Gifts"),
  ]);
});
afterAll(async () => {
  Promise.all([
    await DatabaseClient.clearTable("Users"),
    await DatabaseClient.clearTable("Gifts"),
  ]);
});
describe("Server Authorization Tests", () => {
  let token: string;
  it("registering a user should return a token", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "testUser123@email.com",
      password: "password",
      firstName: "Michael",
      lastName: "Wiltfong",
    });
    token = response.body.token;
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ token: expect.any(String) });
  });
  it("sending a request with an undefined body should return a 400", async () => {
    const response = await request(app).post("/auth/register").send(undefined);
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Request body is undefined" });
  });
  it("registering a user with an email that is already in use should return a 403", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "testUser123@email.com",
      password: "password",
      firstName: "Michael",
      lastName: "Wiltfong",
    });
    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({ error: "Email is already in use" });
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
  it("user can access protected resource with token as Bearer token", async () => {
    const response = await request(app)
      .get("/users/testUser123@email.com")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      email: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
    });
  });
  it("user cannot access protected resource without token", async () => {
    const response = await request(app).get("/users/testUser123@email.com");
    expect(response.status).toBe(401);
  });
});
