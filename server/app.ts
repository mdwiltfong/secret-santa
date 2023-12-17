// api route that returns "hello world"
import express, { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";
import morgan from "morgan";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./prisma/index";
import userRouter from "./routes/userRouter";
import ExpressError from "./utils/ExpressError";
import cookieExtractor from "./utils/JwtCookieExtractor";
import cookieParser from "cookie-parser";
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await User.retrieveUser(email);
        if (!user) {
          return done(
            { status: 401, message: "No user associated with that email" },
            false
          );
        }
        if ((await bcrypt.compare(password, user.getPassword())) === false) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
const opts: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "secret",
};

passport.use(
  // TODO: Define jwt payload type
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const retrieveUser = await User.retrieveUser(jwt_payload.email);
      if (retrieveUser) {
        return done(null, retrieveUser);
      } else {
        throw new ExpressError(400, "User not found");
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
const app = express();
app.use(cookieParser("secret"));
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!!!");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({ error: message });
});
type Error = {
  status?: number;
  message?: string;
};
export default app;
