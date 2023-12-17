import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../prisma/index";
import passport from "passport";
import bcrypt from "bcrypt";
import ExpressError from "../utils/ExpressError";
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
      if (email === undefined) {
        throw new ExpressError(400, "Request body is undefined");
      }
      const foundUser = await User.retrieveUser(email);
      if (foundUser) {
        throw new ExpressError(403, "Email is already in use");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.createUser({
        email,
        password: hashedPassword,
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

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response) => {
    if (req.user == undefined) {
      throw new Error("User is undefined");
    }
    const token = generateToken(req.user as User);
    res.send({ token });
  }
);

function generateToken(userDetails: User) {
  return jwt.sign(
    {
      email: userDetails.getUserEmail(),
      firstName: userDetails.getUserFirstName(),
      lastName: userDetails.getUserLastName(),
      sessions: userDetails.getSessions(),
      gifts: userDetails.getGifts(),
    },
    "secret",
    { expiresIn: "1h" }
  );
}

export default authRouter;
