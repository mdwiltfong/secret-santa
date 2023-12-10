type User = {
  email: string;
  firstName: string;
  lastName: string;
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
    password: "$2y$10$nm/2RZ.8whxG3diMjuv8du2QlMMlB9BsNRIjArPGHrOZU4L7dcUGC",
  },
  {
    firstName: "Test",
    lastName: "User 2",
    email: "testUser2@email.com",
    password: "$2y$10$nm/2RZ.8whxG3diMjuv8du2QlMMlB9BsNRIjArPGHrOZU4L7dcUGC",
  },
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
