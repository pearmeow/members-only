const { Pool } = require("../db/pool");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
require("dotenv").config();

const theSession = expressSession({
    store: new pgSession({
        pool: Pool,
    }),
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
});

module.exports = theSession;
