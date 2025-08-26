#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");
require("dotenv").config();

// Sample sql, change to fit database
const SQL = `
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    username VARCHAR(64) PRIMARY KEY,
    firstName VARCHAR(64) NOT NULL,
    lastName VARCHAR(64) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isMember BOOL DEFAULT FALSE NOT NULL,
    isAdmin BOOL DEFAULT FALSE NOT NULL
);

CREATE TABLE posts(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(64) REFERENCES users(username),
    text VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL
);
`;

DB_URL =
    argv[2] ||
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.PORT || 5432}/${process.env.DATABASE}`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: DB_URL,
        ssl: argv[2] && true,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
