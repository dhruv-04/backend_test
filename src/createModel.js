const { createUserTable } = require('../src/models/userModel');

const initializeDatabase = async() => {
    try {
        await createUserTable();
    } catch (err) {
        throw err;
    }
};

initializeDatabase();