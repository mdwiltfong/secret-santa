import { DatabaseClient, User, Gift, GiftGivingSession } from "../../prisma";
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
describe("Database Smoke test", () => {
  it("should connect to the database", async () => {
    await DatabaseClient.pingDb();
  });
});

describe("Prisma Client Tests", () => {
  let giftOne: Gift,
    giftTwo: Gift,
    testUser: User,
    giftGivingSession: GiftGivingSession;
  it("Should be able to create a gift", async () => {
    giftOne = await Gift.createGift({
      name: "Test Gift",
      description: "Really nice gift",
    });
    giftTwo = await Gift.createGift({
      name: "Test Gift 2",
    });
    expect(giftOne).not.toBeNull();
    expect(giftTwo).not.toBeNull();
  });
  it("Should be able to create a user", async () => {
    testUser = await User.createUser({
      firstName: "Test",
      lastName: "User",
      email: "testUser@email.com",
      password: "$2y$10$nm/2RZ.8whxG3diMjuv8du2QlMMlB9BsNRIjArPGHrOZU4L7dcUGC",
    });
    expect(testUser).not.toBeNull;
  });
  it("Should be able to create a gift giving session", async () => {
    giftGivingSession = await GiftGivingSession.createGiftGivingSession({
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Test Giving Session",
      date: new Date("2012-12-12"),
    });
    expect(giftGivingSession).not.toBeNull();
  });
  it("Should be able to assign a gift to a user", async () => {
    const userGift = await testUser.assignGiftToUser(giftOne.getGiftID());
    expect(userGift).not.toBeNull();
  });
  it("Should be able to assign a user to a gift giving session", async () => {
    const userGiftSession = await testUser.assignUserToGiftSession(
      giftGivingSession.getGiftGivingSessionID()
    );
    expect(userGiftSession).not.toBeNull();
  });
  it("Should be able to get a user's gifts", async () => {
    const userGifts = await testUser.getAllGifts();
    expect(userGifts.length).not.toBe(0);
  });
  it("Should be able to get a user's gift giving sessions", async () => {
    const userGiftGivingSessions = await testUser.getGiftGivingSessions();
    expect(userGiftGivingSessions.length).not.toBe(0);
  });
  it("Should be able to get all the users assigned to a gift giving session", async () => {
    const giftGivingSessionUsers = await giftGivingSession.getUsers();
    expect(giftGivingSessionUsers.length).not.toBe(0);
  });

  it("Should be able to get all the gifts assigned to a gift giving session", async () => {
    const giftGivingSessionGifts = await giftGivingSession.getGifts();
    expect(giftGivingSessionGifts.length).not.toBe(0);
  });
});
