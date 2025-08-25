const pool = require("./pool");

async function getAllPosts() {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
}

async function getNameFromUsername(username) {
    const { rows } = await pool.query(
        "SELECT firstName, lastName FROM users WHERE username = $1",
        [username],
    );
    return rows;
}

async function createUser(
    username,
    firstName,
    lastName,
    password,
    isMember,
    isAdmin,
) {
    await pool.query(
        "INSERT INTO users (username, firstName, lastName, password, isMember, isAdmin) VALUES($1, $2, $3, $4, $5, $6)",
        [username, firstName, lastName, password, isMember, isAdmin],
    );
}

async function createPost(username, text) {
    await pool.query(
        "INSERT INTO posts (username, text, date) VALUES($1, $2, $3)",
        [username, text, new Date()],
    );
}

async function updateUser(username, isMember, isAdmin) {
    if (isMember) {
        await pool.query(
            "UPDATE users SET isMember = true WHERE username = $1",
            [username],
        );
    }
    if (isAdmin) {
        await pool.query(
            "UPDATE users SET isAdmin = true WHERE username = $1",
            [username],
        );
    }
}

async function deletePost(id) {
    await pool.query("DELETE FROM posts * WHERE id = $1", [id]);
}

module.exports = {
    getAllPosts,
    getNameFromUsername,
    createUser,
    createPost,
    updateUser,
    deletePost,
};
