import { jest } from "@jest/globals";
import sendGrid from "../sendGrid/app";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SendGrid from "@sendgrid/mail";
jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn(() => 202),
  };
});
describe("SendGrid Tests", () => {
  test("SendGrid should be defined", () => {
    expect(sendGrid).toBeDefined();
  });
  test("Sends email", async () => {
    const responseCode = await sendGrid.sendEmail("testToken", "testEmail");
    expect(responseCode).toBe(202);
  });
});
