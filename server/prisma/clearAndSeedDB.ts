import { DatabaseClient, User, Gift, GiftGivingSession } from ".";
import { mockData } from "../mockData/mockData";
async function clearDB() {
  try {
    Promise.all([
      await DatabaseClient.clearTable("Users"),
      await DatabaseClient.clearTable("Gifts"),
      await DatabaseClient.clearTable("Sessions"),
      await DatabaseClient.clearTable("SessionUserGifts"),
    ]);
  } catch (error) {
    console.log(error);
  }
}

async function seedDB() {
  try {
    await Promise.all([
      mockData.mockUsers.forEach(async (user) => {
        await User.createUser(user);
      }),
      mockData.mockGifts.forEach(async (gift) => {
        await Gift.createGift(gift);
      }),
      mockData.mockSessions.forEach(async (session) => {
        await GiftGivingSession.createGiftGivingSession(session);
      }),
      mockData.mockSessions.forEach(async (sessionUserGift) => {
        await GiftGivingSession.createGiftGivingSession(sessionUserGift);
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  await clearDB();
  await seedDB();
}

main();
