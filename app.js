const express = require("express");
const path = require("node:path");
const passport = require("./controllers/passportController");
const indexRouter = require("./routes/indexRouter");
const expressSession = require("./controllers/sessionController");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(expressSession);
app.use(passport.session());
app.use(express.urlencoded({ extended: true })); // make post work and have a body

app.use("/", indexRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on http://127.0.0.1:${PORT}`);
});
