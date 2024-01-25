import { DatabaseClient, User, Gift, GiftGivingSession } from "../prisma";
beforeAll(async () => {
  Promise.all([
    await DatabaseClient.clearTable("Users"),
    await DatabaseClient.clearTable("Gifts"),
    await DatabaseClient.clearTable("Sessions"),
    await DatabaseClient.clearTable("SessionUserGifts"),
  ]);
});
afterAll(async () => {
  Promise.all([
    await DatabaseClient.clearTable("Users"),
    await DatabaseClient.clearTable("Gifts"),
    await DatabaseClient.clearTable("Sessions"),
    await DatabaseClient.clearTable("SessionUserGifts"),
  ]);
});
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
    expect(giftOne).toMatchObject({
      id: expect.any(Number),
      name: "Test Gift",
      description: "Really nice gift",
      link: null,
    });
  });
  it("Should be able to create a user", async () => {
    testUser = await User.createUser({
      firstName: "Test",
      lastName: "User",
      email: "testUser@email.com",
      password: "$2y$10$nm/2RZ.8whxG3diMjuv8du2QlMMlB9BsNRIjArPGHrOZU4L7dcUGC",
    });
    expect(testUser).not.toBeNull;
    expect(testUser).toMatchObject({
      id: expect.any(Number),
      firstName: "Test",
      lastName: "User",
      email: expect.any(String),
      password: expect.any(String),
    });
  });
  it("Should be able to create a gift giving session", async () => {
    giftGivingSession = await GiftGivingSession.createGiftGivingSession({
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Test Giving Session",
      date: new Date("2012-12-12"),
    });
    expect(giftGivingSession).not.toBeNull();
    expect(giftGivingSession).toMatchObject({
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      name: "Test Giving Session",
      description: null,
      date: expect.any(Date),
    });
  });
  it("Should be able to assign a gift to a user", async () => {
    const userGift = await testUser.assignGiftToUser(giftOne.getGiftID(), 5);
    expect(userGift).not.toBeNull();
    expect(userGift).toMatchObject({
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      userId: expect.any(Number),
      giftId: expect.any(Number),
      quantity: 5,
    });
  });

  it("Should be able to retrieve tokens for a user", async () => {
    const tokens = await testUser.getTokens();
    expect(tokens).not.toBeNull();
    // if (tokens.length == 0) {
    //   expect(tokens[0]).toMatchObject({
    //     id: expect.any(Number),
    //     createdAt: expect.any(Date),
    //     updatedAt: expect.any(Date),
    //     valid: expect.any(Boolean),
    //     jwtToken: expect.any(String),
    //     userId: expect.any(Number),
    //   });
    // }
  });
  it("Should be able to retrieve inventory for a user", async () => {
    const inventoryRecords = await testUser.getInventory();
    expect(inventoryRecords).not.toBeNull();
    expect(inventoryRecords![0]).toMatchObject({
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      userId: expect.any(Number),
      giftId: expect.any(Number),
      quantity: 5,
    });
  });
  it("Should be able to assign part of inventory to a gift giving session", async () => {
    const userGiftSession = await testUser.assignUsersGiftToSession(
      giftOne.getGiftID(),
      giftGivingSession.getGiftGivingSessionID(),
      5
    );
    expect(userGiftSession).not.toBeNull();
    expect(userGiftSession).toMatchObject({
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      sessionID: expect.any(Number),
      userId: expect.any(Number),
      giftId: expect.any(Number),
      quantity: 5,
    });
  });
  it("Should not be able to assign more then the inventory to a gift giving session", async () => {
    const userGiftSession = await testUser.assignUsersGiftToSession(
      giftOne.getGiftID(),
      giftGivingSession.getGiftGivingSessionID(),
      5
    );
    expect(userGiftSession).toBeUndefined();
  });
  it("Should be able to assign a user to a gift giving session", async () => {
    const userGiftSession = await testUser.assignUserToGiftSession(
      giftGivingSession.getGiftGivingSessionID()
    );
    expect(userGiftSession).not.toBeNull();
  });
  it("Should be able to get a user's gift giving sessions", async () => {
    const userGiftGivingSessions = await testUser.getGiftGivingSessions();
    expect(userGiftGivingSessions.length).not.toBe(0);
  });
  it("Should be able to get all the users assigned to a gift giving session", async () => {
    const giftGivingSessionUsers = await giftGivingSession.getUsers();
    expect(giftGivingSessionUsers.length).not.toBe(0);
  });
  it("Should be able to assign a users gift to a session", async () => {
    const userGiftSession = await testUser.assignUsersGiftToSession(
      giftOne.getGiftID(),
      giftGivingSession.getGiftGivingSessionID(),
      5
    );
    expect(userGiftSession).not.toBeNull();
  });
  it("Should be able to get all the gifts assigned to a gift giving session", async () => {
    const giftGivingSessionGifts = await giftGivingSession.getGifts();
    expect(giftGivingSessionGifts.length).not.toBe(0);
  });
});
