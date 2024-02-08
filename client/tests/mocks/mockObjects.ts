const mockUsers: MockUser[] = [
  {
    firstName: "Test1",
    lastName: "test1",
    email: "test@test.com",
    password: "password",
  },
];

const mocks = {
  mockUsers,
};

type MockUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default mocks;
