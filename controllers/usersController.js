const { body, validationResult, matchedData } = require("express-validator");
const { makePassword } = require("../utils/authenticate");
const db = require("../db/queries.js");

const getRegister = (req, res) => {
    res.render("register", { title: "Register", errors: [] });
};

const validateUser = [
    body("username")
        .trim()
        .isLength({ min: 1, max: 64 })
        .withMessage("Username must be between 1 and 64 characters long"),
    body("firstname")
        .trim()
        .isLength({ min: 1, max: 64 })
        .withMessage("First name must be between 1 and 64 characters long"),
    body("lastname")
        .trim()
        .isLength({ min: 1, max: 64 })
        .withMessage("Last name must be between 1 and 64 characters long"),
    body("password")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Password must be between 1 and 255 characters long"),
];

const postRegister = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("register", {
                title: "Register",
                errors: errors.array(),
            });
        }
        const results = matchedData(req);
        await db.createUser(
            results.username,
            results.firstname,
            results.lastname,
            await makePassword(results.password),
        );
        res.redirect("/");
    },
];

const getLogin = (req, res) => {
    res.render("login", { title: "Log in", errors: [] });
};

const getLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};

const getMember = (req, res) => {
    res.render("member", { title: "Become a member", errors: [] });
};

const postMember = async (req, res) => {
    if (req.body.code === "cats_are_cool") {
        await db.updateUser(res.locals.currentUser.username, true, false);
        res.redirect("/");
    } else {
        res.render("member", {
            title: "Become a member",
            errors: [{ msg: "Wrong code!" }],
        });
    }
};

const getAdmin = (req, res) => {
    res.render("admin", { title: "Become an admin", errors: [] });
};

const postAdmin = async (req, res) => {
    if (req.body.code === "sekiroshadowsdietwice") {
        await db.updateUser(res.locals.currentUser.username, false, true);
        res.redirect("/");
    } else {
        res.render("admin", {
            title: "Become an admin",
            errors: [{ msg: "Hesitation is defeat!" }],
        });
    }
};

module.exports = {
    getLogin,
    getLogout,
    getRegister,
    postRegister,
    getMember,
    postMember,
    getAdmin,
    postAdmin,
};
