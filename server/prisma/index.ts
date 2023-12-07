import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Gift = {
  name: string;
  description?: string;
};
class DatabaseClient {
  private prisma = prisma;
  public async createGift(giftDetails: Gift) {
    const gift = await this.prisma.gifts.create({
      data: {
        name: giftDetails.name,
        description: giftDetails.description,
      },
    });
    return gift;
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
