const { Router } = require("express");
const indexRouter = Router();
const postsController = require("../controllers/postsController");
const usersController = require("../controllers/usersController");
const passportController = require("../controllers/passportController");

indexRouter.get("/login", usersController.getLogin);
indexRouter.get("/logout", usersController.getLogout);
indexRouter.post(
    "/login",
    passportController.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/",
    }),
);
indexRouter.get("/register", usersController.getRegister);
indexRouter.post("/register", usersController.postRegister);

indexRouter.get("/create", postsController.getCreatePost);
indexRouter.post("/create", postsController.createPost);

indexRouter.get("/", postsController.getPosts);
indexRouter.get("/{*splat}", (req, res) => {
    res.redirect("/");
});

module.exports = indexRouter;
