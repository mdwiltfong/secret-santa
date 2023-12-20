import { PrismaClient } from "@prisma/client";
import config from "../utils/Config";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL,
    },
  },
});
type GiftDetails = {
  name: string;
  description?: string;
};

type UserDetails = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

type Session = {
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
  private firstName: string | null;
  private lastName: string | null;
  private sessions?: GiftGivingSession[];
  private gifts?: Gift[];
  private password: string;

  constructor(newUser: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    password: string;
  }) {
    this.id = newUser.id;
    this.email = newUser.email;
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.password = newUser.password;
  }

  public async assignGiftToUser(giftId: number, quantity: number) {
    const userGift = await User.prisma.sessionUserGifts.create({
      data: {
        userId: this.id,
        giftId: giftId,
        quantity: quantity,
      },
    });
    return userGift;
  }
  public async assignUserToGiftSession(giftSessionId: number) {
    try {
      const userGiftSession = await User.prisma.sessionUserGifts.create({
        data: {
          userId: this.id,
          sessionID: giftSessionId,
        },
        include: {
          session: true,
        },
      });
      if (userGiftSession.session === null)
        throw new Error("Session not found");
      return new GiftGivingSession(userGiftSession.session);
    } catch (error) {
      console.log(error);
    }
  }
  public async getAllGifts(): Promise<Gift[]> {
    const gifts = await User.prisma.gifts.findMany({
      where: {
        sessionUserGifts: {
          some: {
            userId: this.id,
          },
        },
      },
    });
    return gifts.map((gift) => new Gift(gift));
  }
  public async getGiftsForGiftGivingSession(
    giftGivingSessionId: number
  ): Promise<Gift[]> {
    const gifts = await User.prisma.gifts.findMany({
      where: {
        sessionUserGifts: {
          some: {
            userId: this.id,
            sessionID: giftGivingSessionId,
          },
        },
      },
    });
    return gifts.map((gift) => new Gift(gift));
  }
  public async getGiftGivingSessions(): Promise<GiftGivingSession[]> {
    const giftGivingSessions = await User.prisma.sessions.findMany({
      where: {
        sessionUserGifts: {
          some: {
            userId: this.id,
          },
        },
      },
    });
    return giftGivingSessions.map(
      (giftGivingSession) => new GiftGivingSession(giftGivingSession)
    );
  }
  public static async retrieveUser(userEmail: string) {
    const user = await User.prisma.users.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) {
      console.log("User not found");
      return null;
    }
    return new User(user);
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
    if (user) console.log("User created");
    return new User(user);
  }
  public async assignUsersGiftToSession(
    giftId: number,
    sessionId: number,
    quantity: number
  ) {
    const userGift = await User.prisma.sessionUserGifts.create({
      data: {
        userId: this.id,
        giftId: giftId,
        sessionID: sessionId,
        quantity: quantity,
      },
    });
    return userGift;
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
  public getUserID() {
    return this.id;
  }
  public getSessions() {
    return this.sessions;
  }
  public getGifts() {
    return this.gifts;
  }
  public getPassword() {
    return this.password;
  }
}

export class Gift {
  private static prisma = prisma;
  private id: number;
  private name: string;
  private description: string | null;
  private link: string | null;

  constructor(newGift: {
    id: number;
    name: string;
    description: string | null;
    link: string | null;
  }) {
    this.id = newGift.id;
    this.name = newGift.name;
    this.description = newGift.description;
    this.link = newGift.link;
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
  public async getUsers() {
    const users = await GiftGivingSession.prisma.users.findMany({
      where: {
        sessionUserGifts: {
          some: {
            sessionID: this.giftGivingSession.id,
          },
        },
      },
    });
    return users.map((user) => new User(user));
  }
  public async getGifts() {
    const gifts = await GiftGivingSession.prisma.gifts.findMany({
      where: {
        sessionUserGifts: {
          some: {
            sessionID: this.giftGivingSession.id,
          },
        },
      },
    });
    return gifts.map((gift) => new Gift(gift));
  }
  public static async createGiftGivingSession(
    giftGivingSessionDetails: Session
  ) {
    const giftSession = await this.prisma.sessions.create({
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
