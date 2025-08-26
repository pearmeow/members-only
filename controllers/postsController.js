const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");

const getPosts = async (req, res) => {
    const posts = await db.getAllPosts();
    return res.render("index", {
        title: "posts",
        posts: posts,
    });
};

const validatePost = body("text")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Post must be between 1 and 255 characters long");

const getCreatePost = (req, res) => {
    res.render("create", { title: "Create Post", errors: [] });
};

const createPost = [
    validatePost,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("index", { errors: errors.array() });
        }
        const text = matchedData(req).text;
        db.createPost(res.locals.currentUser.username, text);
        res.redirect("/");
    },
];

const deletePost = (req, res) => {
    if (res.locals.currentUser && res.locals.currentUser.isadmin) {
        db.deletePost(req.body.id);
    }
    res.redirect("/");
};

module.exports = {
    getPosts,
    getCreatePost,
    createPost,
    deletePost,
};
