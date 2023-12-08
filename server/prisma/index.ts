import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type GiftDetails = {
  name: string;
  description?: string;
};
type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type GiftGivingSessionDetails = {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  date: Date;
};
class DatabaseClient {
  private prisma = prisma;
  public async createGift(giftDetails: GiftDetails) {
    const gift = await this.prisma.gifts.create({
      data: {
        name: giftDetails.name,
        description: giftDetails.description,
      },
    });
    return gift;
  }
  public async createUser(userDetails: UserDetails) {
    const user = await this.prisma.users.create({
      data: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
      },
    });
    return user;
  }
  public async createGiftGivingSession(
    giftGivingSessionDetails: GiftGivingSessionDetails
  ) {
    const giftSession = await this.prisma.giftGivingSessions.create({
      data: {
        createdAt: giftGivingSessionDetails.createdAt,
        updatedAt: giftGivingSessionDetails.updatedAt,
        name: giftGivingSessionDetails.name,
        description: giftGivingSessionDetails.description,
        date: giftGivingSessionDetails.date,
      },
    });
    return giftSession;
  }
  public async pingDb() {
    try {
      await this.prisma.$connect();
      console.log("Database connected");
    } catch (error) {
      console.log("Database connection failed");
      console.log(error);
    }
  }
}
const dbClient = new DatabaseClient();
export default dbClient;
