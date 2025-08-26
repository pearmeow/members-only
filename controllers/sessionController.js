const pool = require("../db/pool");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
require("dotenv").config();

const theSession = expressSession({
    store: new pgSession({
        pool: pool,
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
});

module.exports = theSession;
