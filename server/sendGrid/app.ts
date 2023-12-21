import sgMail from "@sendgrid/mail";
import config from "../utils/Config";
sgMail.setApiKey(config.SEND_GRID_KEY);

class SendGrid {
  static sendGridClient = sgMail;
  static msgTemplate = `Hey There! You have been invited to a Secret Santa Gift Exchange! Click the link below to join the fun! \n`;
  static emailDetails = {
    to: "",
    from: config.SEND_GRID_EMAIL,
    subject: "You have been invited to a Secret Santa Gift Exchange!",
    text: this.msgTemplate,
  };
  static async sendEmail(token: string, to: string) {
    try {
      this.emailDetails.text += `http://localhost:${config.PORT}/join/${token}`;
      this.emailDetails.to = to;
      const response = await this.sendGridClient.send(this.emailDetails);
      return response[0].statusCode;
    } catch (error) {
      console.error(error);
    }
  }
}

export default SendGrid;
