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

export class User {
  private static prisma = prisma;
  private id: number;
  private email: string;
  private firstName: string;
  private lastName: string;
  private giftSessionId: number | null;
  constructor(newUser: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    giftSessionId: number | null;
  }) {
    this.id = newUser.id;
    this.email = newUser.email;
    this.firstName = newUser.firstName;
    this.giftSessionId = newUser.giftSessionId;
    this.lastName = newUser.lastName;
  }
  public static async createUser(userDetails: UserDetails) {
    const user = await this.prisma.users.create({
      data: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
      },
    });
    return new User(user);
  }
  public async assignGiftToUser(giftId: number) {
    const userGift = await User.prisma.users_Gifts.create({
      data: {
        userId: this.id,
        giftId: giftId,
      },
    });
    return userGift;
  }
  public async assignUserToGiftSession(giftSessionId: number) {
    const userGiftSession = await User.prisma.users_GiftGivingSessions.create({
      data: {
        userId: this.id,
        giftGivingSessionId: giftSessionId,
      },
    });
    const assignedGiftSession = await User.prisma.giftGivingSessions.findUnique(
      {
        where: {
          id: userGiftSession.giftGivingSessionId,
        },
      }
    );
    if (!assignedGiftSession) {
      throw new Error("Gift Giving Session not found");
    }
    return new GiftGivingSession(assignedGiftSession);
  }
  public static async retrieveUser(userEmail: string) {
    const user = await User.prisma.users.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return new User(user);
  }
  public getUserFirstName() {
    return this.firstName;
  }
  public getUserLastName() {
    return this.lastName;
  }
  public getUserEmail() {
    return this.email;
  }
  public getUserGiftSessionId() {
    return this.giftSessionId;
  }
  public getUserID() {
    return this.id;
  }
}

export class Gift {
  private static prisma = prisma;
  private id: number;
  private name: string;
  private description: string | null;
  private link: string | null;
  private giftSessionID: number | null;
  constructor(newGift: {
    id: number;
    name: string;
    description: string | null;
    link: string | null;
    giftSessionId: number | null;
  }) {
    this.id = newGift.id;
    this.name = newGift.name;
    this.description = newGift.description;
    this.link = newGift.link;
    this.giftSessionID = newGift.giftSessionId;
  }
  public static async createGift(giftDetails: GiftDetails) {
    const gift = await this.prisma.gifts.create({
      data: {
        name: giftDetails.name,
        description: giftDetails.description,
      },
    });
    return new Gift(gift);
  }
  public getGiftName() {
    return this.name;
  }
  public getGiftDescription() {
    return this.description;
  }
  public getGiftLink() {
    return this.link;
  }
  public getGiftSessionID() {
    return this.giftSessionID;
  }
  public getGiftID() {
    return this.id;
  }
}

export class GiftGivingSession {
  private static prisma = prisma;
  constructor(
    private giftGivingSession: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      name: string;
      description: string | null;
      date: Date;
    }
  ) {}
  public static async createGiftGivingSession(
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
    return new GiftGivingSession(giftSession);
  }
  public getGiftGivingSessionID() {
    return this.giftGivingSession.id;
  }
}
export class DatabaseClient {
  private static prisma = prisma;
  public static async clearTable(tableName: string) {
    // eslint-disable-next-line no-useless-escape
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \"${tableName}\" CASCADE;`);
  }
  public static async pingDb() {
    try {
      await this.prisma.$connect();
      console.log("Database connected");
    } catch (error) {
      console.log("Database connection failed");
      console.log(error);
    }
  }
}
