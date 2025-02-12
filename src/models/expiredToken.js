const pool = require('../config/dbconfig');

const createExpiredTokenTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS expired_tokens (
                token VARCHAR(255) PRIMARY KEY,
                logout_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                guest_ID INTEGER
            );
        `;
        await pool.query(query);
        console.log('Table expiredTokens created successfully!');
    } catch (err) {
        console.error(`Error creating expiredTokens table: ${err}`);
    }
};

// Function to fetch a specific token
const fetchToken = async (token) => {
    try {
        const query = `SELECT * FROM expired_tokens WHERE token = ?;`;
        const [rows] = await pool.query(query, [token]);
        return rows;
    } catch (err) {
        console.error(`Error fetching token ${token}: ${err}`);
        throw err;
    }
};

// Function to fetch all tokens
const fetchAllTokens = async () => {
    try {
        const query = `SELECT * FROM expired_tokens;`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.error(`Error fetching all tokens: ${err}`);
        throw err;
    }
};

// Function to delete a specific token
const deleteToken = async (token) => {
    try {
        const query = `DELETE FROM expired_tokens WHERE token = ?;`;
        await pool.query(query, [token]);
        console.log(`Token ${token} deleted successfully!`);
    } catch (err) {
        console.error(`Error deleting token ${token}: ${err}`);
        throw err;
    }
};

module.exports = {
    createExpiredTokenTable,
    fetchToken,
    fetchAllTokens,
    deleteToken
};