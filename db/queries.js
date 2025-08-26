const pool = require("./pool");

async function getAllPosts() {
    const { rows } = await pool.query(
        "SELECT * FROM posts JOIN users ON posts.username = users.username",
    );
    return rows;
}

async function getUser(username) {
    const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
    );
    return rows;
}

async function createUser(username, firstname, lastname, password) {
    await pool.query(
        "INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4)",
        [username, firstname, lastname, password],
    );
}

async function createPost(username, text) {
    await pool.query(
        "INSERT INTO posts (username, text, date) VALUES($1, $2, $3)",
        [username, text, new Date()],
    );
}

async function updateUser(username, ismember, isadmin) {
    if (ismember) {
        await pool.query(
            "UPDATE users SET ismember = true WHERE username = $1",
            [username],
        );
    }
    if (isadmin) {
        await pool.query(
            "UPDATE users SET isadmin = true WHERE username = $1",
            [username],
        );
    }
}

async function deletePost(id) {
    await pool.query("DELETE FROM posts * WHERE id = $1", [id]);
}

module.exports = {
    getAllPosts,
    createUser,
    createPost,
    updateUser,
    deletePost,
    getUser,
};
