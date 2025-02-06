import passport from "passport";
import passportJWT from "passport-jwt";
import { User } from "../models/users/repository.js";
const secret = process.env.JWT_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy
passport.use(
  new Strategy(params, function (payload, done) {
    console.log("Payload:", payload);
    const userId = payload.data?.id;
    console.log("Extracted userId:", userId);
    if (!userId) {
      return done(null, false);
    }
    User.findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          console.error("User not found for ID:", userId);
          return done(null, false);
        }
        console.log("Found user:", user);
        return done(null, user);
      })
      .catch((err) => {
        console.error("Error during user lookup:", err);
        return done(err);
      });
  })
);

export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
