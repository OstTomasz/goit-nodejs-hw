import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/users/repository.js";

const SECRET = process.env.JWT_SECRET;

const strategyOptions = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(strategyOptions, (payload, done) => {
    User.findById(payload?.data?.id)
      .then((user) =>
        !user ? done(new Error("User not existing")) : done(null, user)
      )
      .catch(done);
  })
);

export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (!user || error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = user._id;
    next();
  })(req, res, next);
};
