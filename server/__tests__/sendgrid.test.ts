import { jest } from "@jest/globals";
import sendGrid from "../sendGrid/app";
import SendGrid from "@sendgrid/mail";
jest.mock("@sendgrid/mail");
const mockSendGrid = describe("SendGrid Tests", () => {
  test("SendGrid should be defined", () => {
    expect(sendGrid).toBeDefined();
  });
  test("Sends email", async () => {
    SendGrid.send.mockResolvedValueOnce();
  });
});
