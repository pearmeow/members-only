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
    body("firstName")
        .trim()
        .isLength({ min: 1, max: 64 })
        .withMessage("First name must be between 1 and 64 characters long"),
    body("lastName")
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
            results.firstName,
            results.lastName,
            await makePassword(results.password),
        );
        res.redirect("/login");
    },
];

const getLogin = (req, res) => {
    res.render("login", { title: "Log in", errors: [] });
};

module.exports = {
    getLogin,
    getRegister,
    postRegister,
};
