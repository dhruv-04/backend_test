const db = require('../config/dbconfig');

const createUserTable = async () => {
    const query = `
        CREATE TABLE USERS (
            username VARCHAR(15) NOT NULL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            hashed_password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await db.query(query);
};

const createUser = async (user) => {
    const query = `
    INSERT INTO USERS (username, email, hashed_password) 
    VALUES (?,?,?);
    `;

    try {
        await db.query(query, [user.username, user.email, user.hashed_password]);
    } catch(err) {
        throw err;
    }
};

const getUserByUsername = async (username) => {
    const query = `
        SELECT * FROM USERS WHERE username = ?;
    `;

    try {
        const [rows] = db.query(query, [username]);
        return (rows.length() > 0) ? rows[0] : null;
    } catch(err) {
        throw err;
    }
};

const updateUser = async () => {
    //empty for now
};

const deleteUser = async (username) => {
    const query = `
        DELETE FROM USERS WHERE username = ?;
    `;

    try {
        const result = await db.query(query, [username]);
        return result;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    createUserTable,
    createUser,
    getUserByUsername,
    updateUser,
    deleteUser,
};