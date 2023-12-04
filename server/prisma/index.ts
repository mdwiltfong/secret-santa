import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DatabaseClient {
  public prisma = prisma;
  public async pingDb() {
    try {
      await this.prisma.$queryRaw(Prisma.sql`SELECT 1;`);
      console.log("Database connected");
    } catch (error) {
      console.log("Database connection failed");
      console.log(error);
    }
  }
}
const dbClient = new DatabaseClient();
export default dbClient;
