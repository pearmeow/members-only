const { Router } = require("express");
const indexRouter = Router();
const postsController = require("../controllers/postsController");
const usersController = require("../controllers/usersController");
const passportController = require("../controllers/passportController");

indexRouter.get("/login", usersController.getLogin);
indexRouter.post(
    "/login",
    passportController.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/",
    }),
);
indexRouter.get("/register", usersController.getRegister);
indexRouter.post("/register", usersController.postRegister);

indexRouter.get("/", postsController.getPosts);
indexRouter.post("/", postsController.createPost);
indexRouter.get("/{*splat}", (req, res) => {
    res.redirect("/");
});

module.exports = indexRouter;
