type User = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
};

type Gift = {
  name: string;
  description?: string;
};

type Session = {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  date: Date;
};

type EmailToken = {
  createdAt: Date;
  updatedAt: Date;
  jwtToken: string;
  valid: boolean;
  expiration: Date;
  userId: number;
}

type SessionUserGift = {
  createdAt: Date;
  updatedAt: Date;
  sessionID?: number;
  userId: number;
  giftId: number;
  quantity: number;
};

const mockGifts: Gift[] = [
  {
    name: "Test Gift 1",
  },
  {
    name: "Test Gift 2",
    description: "Really nice gift",
  },
];

const mockUsers: User[] = [
  {
    firstName: "Test",
    lastName: "User",
    email: "testUser@email.com",
    password: "$2b$10$wQKPTTzcW0eAo/46hucjJuAAjtWL45fvsA6Ktc7IaDy75Loq2gN8G",
  },
  {
    email: "testUser2@email.com",
    password: "$2b$10$wQKPTTzcW0eAo/46hucjJuAAjtWL45fvsA6Ktc7IaDy75Loq2gN8G",
  },
];

const mockEmailTokens: EmailToken[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    jwtToken: hgew4234hj2gfjh6757df, // need a way to mock this so it is like a real token
    valid: true,
    expiration: new Date(),
  }
];

const mockSessions: Session[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Test Giving Session",
    date: new Date("2012-12-12"),
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Test Giving Session 2",
    date: new Date("2012-12-12"),
  },
];

const mockSessionUserGifts: SessionUserGift[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 1,
    userId: 1,
    giftId: 1,
    quantity: 5,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 1,
    userId: 1,
    giftId: 2,
    quantity: 5,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 1,
    userId: 2,
    giftId: 1,
    quantity: 5,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 1,
    userId: 2,
    giftId: 2,
    quantity: 5,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 2,
    userId: 1,
    giftId: 1,
    quantity: 5,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 2,
    userId: 1,
    giftId: 2,
    quantity: 5,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 2,
    userId: 2,
    giftId: 1,
    quantity: 5,
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    sessionID: 2,
    userId: 2,
    giftId: 2,
    quantity: 5,
  },
];

export const mockData = {
  mockGifts,
  mockUsers,
  mockSessions,
  mockSessionUserGifts,
};
