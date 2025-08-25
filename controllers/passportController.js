const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const { validPassword } = require("../utils/authenticate");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const rows = await db.getUser(username);
            const user = rows[0];
            if (!user) {
                return done(null, false, { message: "Username doesn't exist" });
            }
            if (!validPassword(password, user.password)) {
                return done(null, false, { message: "Password is wrong" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    try {
        const rows = await db.getUser(username);
        const user = rows[0];
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

module.exports = passport;
