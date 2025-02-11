const pool = require('../config/dbconfig');

const createGuestModel = async() => {
    try { 
        query = `
                CREATE TABLE IF NOT EXISTS guests (
                    guestID INTEGER PRIMARY KEY,
                    username VARCHAR(25) UNIQUE NOT NULL,
                    firstName VARCHAR(255) NOT NULL,
                    lastName VARCHAR(255) NOT NULL
                    phoneNumber CHAR(10) NOT NULL,
                    address VARCHAR(500) NOT NULL,
                    familyMembers INTEGER NOT NULL,
                    numberOfNights INTEGER NOT NULL,
                    roomNumber INTEGER NOT NULL,
                    roomCode VARCHAR(10) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `;

        await pool.query(query);
        console.log('Table guests created successfully!');
    } catch (err) {
        console.error(`Error while creating the table : ${err}`);
    }
};

const registrationData = async(user) => {
    try {
        const { guestID, username, firstName, lastName, phoneNumber, address, familyMembers, numberOfNights, roomNumber, roomCode } = user;
        query = `INSERT INTO guests (guestID, username, firstName, lastName, phoneNumber, address, familyMembers, numberOfNights, roomNumber, roomCode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await pool.query(query, [guestID, username, firstName, lastName, phoneNumber, address, familyMembers, numberOfNights, roomNumber, roomCode]);
        console.log('Insertion in the guest table successful!');
        return true;
    } catch (err) {
        console.error(`Error while registering guest : ${err}`);
        return false;
    }
};

const deleteData = async(guestID) => {
    try {
        query = `DELETE FROM guests WHERE guestID = ?;`;
        pool.query(query, [guestID]);
        console.error('Deletion from database successful!');
        return true;
    } catch (err) {
        console.error('Deletion could not be executed!', err);
        return false;
    }
};

const createPastGuestModel = async() => {
    try { 
        query = `
                CREATE TABLE IF NOT EXISTS pastGuests (
                    guestID INTEGER PRIMARY KEY,
                    username VARCHAR(25) UNIQUE NOT NULL,
                    firstName VARCHAR(255) NOT NULL,
                    lastName VARCHAR(255) NOT NULL
                    phoneNumber CHAR(10) NOT NULL,
                    address VARCHAR(500) NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `;

        await pool.query(query);
        console.log('Table guests created successfully!');
    } catch (err) {
        console.error(`Error while creating the table : ${err}`);
    }
};

const pastGuestData = async(user) => {
    try {
        const { guestID, username, firstName, lastName, phoneNumber, address, familyMembers, numberOfNights, roomNumber, roomCode } = user;
        query = `INSERT INTO pastGuests (guestID, username, firstName, lastName, phoneNumber, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await pool.query(query, [guestID, username, firstName, lastName, phoneNumber, address, familyMembers, numberOfNights, roomNumber, roomCode]);
        console.log('Insertion in the pastGuest table successful!');
        return true;
    } catch (err) {
        console.error(`Error while registering past guest : ${err}`);
        return false;
    }
};

module.exports = {
    createGuestModel,
    createPastGuestModel,
    registrationData,
    deleteData,
    pastGuestData
}