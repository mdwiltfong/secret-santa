import dbClient from "../../prisma";

describe("Database Smoke test", () => {
  it("should connect to the database", async () => {
    await dbClient.pingDb();
  });
});
