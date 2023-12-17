import express, { NextFunction, Request, Response } from "express";

import { User } from "../prisma/index";
import passport from "passport";

const userRouter = express.Router();

userRouter.get(
  "/:userEmail",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.retrieveUser(req.params.userEmail);
      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

export default userRouter;
