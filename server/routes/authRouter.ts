import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../prisma/index";
const authRouter = express.Router();
/* type UserToken = {
  email: string;
  firstName?: string;
  lastName?: string;
  sessions?: GiftGivingSession[];
  gifts?: Gift[];
}; */
type requstBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, firstName, lastName } = req.body as requstBody;

      //Check If User Exists
      const foundUser = await User.retrieveUser(email);
      if (foundUser) {
        return res.status(403).json({ error: "Email is already in use" });
      }

      const newUser = await User.createUser({
        email,
        password,
        firstName,
        lastName,
      });

      const token = generateToken(newUser);
      res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }
);

function generateToken(userDetails: User) {
  return jwt.sign(
    {
      email: userDetails,
      firstName: userDetails.getUserFirstName,
      lastName: userDetails.getUserLastName,
    },
    "secret",
    { expiresIn: "1h" }
  );
}

export default authRouter;
