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

indexRouter.get("/member", usersController.getMember);
indexRouter.post("/member", usersController.postMember);

indexRouter.get("/register", usersController.getRegister);
indexRouter.post("/register", usersController.postRegister);

indexRouter.get("/create", postsController.getCreatePost);
indexRouter.post("/create", postsController.createPost);

indexRouter.post("/delete", postsController.deletePost);

indexRouter.get("/admin", usersController.getAdmin);
indexRouter.post("/admin", usersController.postAdmin);

indexRouter.get("/", postsController.getPosts);
indexRouter.get("/{*splat}", (req, res) => {
    res.redirect("/");
});

module.exports = indexRouter;
