import dbClient from "../../prisma";

describe("Database Smoke test", () => {
  it("should connect to the database", async () => {
    await dbClient.pingDb();
  });
});

describe("Prisma Client Tests", () => {
  it("Should be able to create a gift", async () => {
    const giftOne = await dbClient.createGift({
      name: "Test Gift",
      description: "Really nice gift",
    });
    const giftTwo = await dbClient.createGift({
      name: "Test Gift 2",
    });
    expect(giftOne).not.toBeNull();
    expect(giftTwo).not.toBeNull();
  });
});
