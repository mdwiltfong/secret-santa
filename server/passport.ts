import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { User } from "./prisma/index";
const JwtStrategy = Strategy;
const JwtExtractor = ExtractJwt;
const opts: StrategyOptions = {
  jwtFromRequest: JwtExtractor.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    const retrieveUser = User.retrieveUser(jwt_payload.email);
    if (retrieveUser) {
      return done(null, retrieveUser);
    } else {
      return done(null, false);
    }
  })
);
