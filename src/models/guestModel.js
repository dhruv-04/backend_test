const pool = require('../config/dbconfig');

const createGuestModel = async() => {
    try { 
        query = `
                CREATE TABLE IF NOT EXISTS guests (
                    guest_ID INTEGER PRIMARY KEY,
                    username VARCHAR(25) UNIQUE NOT NULL,
                    hashed_Password VARCHAR(255) NOT NULL,
                    first_Name VARCHAR(255) NOT NULL,
                    last_Name VARCHAR(255) NOT NULL,
                    phone_Number CHAR(10) NOT NULL,
                    address VARCHAR(500) NOT NULL,
                    family_Members INTEGER NOT NULL,
                    number_Of_Nights INTEGER NOT NULL,
                    room_Number INTEGER NOT NULL,
                    room_Code VARCHAR(10) NOT NULL,
                    created_At DATETIME DEFAULT CURRENT_TIMESTAMP
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
        const { guest_ID, username, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code } = user;
        query = `INSERT INTO guests (guest_ID, username, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await pool.query(query, [guest_ID, username, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code]);
        console.log('Insertion in the guest table successful!');
        return true;
    } catch (err) {
        console.error(`Error while registering guest : ${err}`);
        return false;
    }
};

const deleteData = async(guest_ID) => {
    try {
        query = `DELETE FROM guests WHERE guest_ID = ?;`;
        pool.query(query, [guest_ID]);
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
                    guest_ID INTEGER PRIMARY KEY,
                    username VARCHAR(25) UNIQUE NOT NULL,
                    first_Name VARCHAR(255) NOT NULL,
                    last_Name VARCHAR(255) NOT NULL,
                    phone_Number CHAR(10) NOT NULL,
                    address VARCHAR(500) NOT NULL,
                    created_At DATETIME DEFAULT CURRENT_TIMESTAMP
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
        const { guest_ID, username, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code } = user;
        query = `INSERT INTO pastGuests (guest_ID, username, first_Name, last_Name, phone_Number, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await pool.query(query, [guest_ID, username, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code]);
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