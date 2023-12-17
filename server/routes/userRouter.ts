import express, { NextFunction, Request, Response } from "express";

import { User } from "../prisma/index";
import passport from "passport";

const userRouter = express.Router();
userRouter.use(passport.authenticate("jwt", { session: false }));
userRouter.get(
  "/:userEmail",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.retrieveUser(req.params.userEmail);
      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

userRouter.post(
  "/:userEmail/session",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const retrievedUser = await User.retrieveUser(req.params.userEmail);
      if (!retrievedUser) {
        throw new Error("User not found");
      }
      const assignedSession = await retrievedUser.assignUserToGiftSession(
        req.body.sessionId
      );
      if (!assignedSession) {
        throw new Error("Session not found");
      }
      return res.status(200).json(assignedSession);
    } catch (error) {
      return next(error);
    }
  }
);

export default userRouter;
