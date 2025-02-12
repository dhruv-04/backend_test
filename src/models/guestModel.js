const pool = require('../config/dbconfig');

//function to create guest model
const createGuestModel = async() => {
    try { 
        const query = `
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

//function to insert guest data
const insertGuestData = async(user) => {
    try {
        const { guest_ID, username, hashed_password, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code } = user;
        const query = `INSERT INTO guests (guest_ID, username, hashed_password, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await pool.query(query, [guest_ID, username, hashed_password, first_Name, last_Name, phone_Number, address, family_Members, number_Of_Nights, room_Number, room_Code]);
        console.log('Insertion in the guest table successful!');
    } catch (err) {
        console.error(`Error while registering guest : ${err}`);
        throw err;
    }
};

//function to delete guest data
const deleteGuestData = async(guest_ID) => {
    try {
        query = `DELETE FROM guests WHERE guest_ID = ?;`;
        await pool.query(query, [guest_ID]);
        console.error('Deletion from database successful!');
    } catch (err) {
        console.error('Deletion could not be executed!', err);
        throw err;
    }
};

//function to fetch data from guests using guest_id
const fetchGuestData = async(guest_ID) => {
    try {
        const query = `SELECT * FROM guests WHERE guest_ID = ?;`;
        const [rows] = await pool.query(query, [guest_ID]);
        return [rows];
    } catch (err) {
        console.error(`Error fetching data for user ${guest_ID} : ${err}`);
        throw err;
    }
};

//function to fetch all the data from past guest
const fetchAllGuestData = async() => {
    try {
        const query = `SELECT * FROM guests;`;
        const [rows] = await pool.query(query);
        return [rows];
    } catch (err) {
        console.error(`Error fetching data for user : ${err}`);
        throw err;
    }
};


//create past guest model
const createPastGuestModel = async() => {
    try { 
        const query = `
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

//function to fetch data from past guest using guest_id
const fetchPastGuestData = async(guest_ID) => {
    try {
        const query = `SELECT * FROM pastGuests WHERE guest_ID = ?;`;
        const [rows] = await pool.query(query, [guest_ID]);
        return [rows];
    } catch (err) {
        console.error(`Error fetching data for user ${guest_ID} : ${err}`);
        throw err;
    }
};

//function to fetch all the data from past guest
const fetchAllPastGuestData = async() => {
    try {
        const query = `SELECT * FROM pastGuests;`;
        const [rows] = await pool.query(query);
        return [rows];
    } catch (err) {
        console.error(`Error fetching data for user : ${err}`);
        throw err;
    }
};


//function to delete past guest data 
const deletePastGuestData = async(guest_ID) => {
    try {
        const query = `DELETE FROM pastGuests WHERE guest_ID = ?;`;
        await pool.query(query, [guest_ID]);
        console.log(`Deletion from room service utilized table successful!`);
    } catch (err) {
        console.error(`Error deleting data for user ${guest_ID} : ${err}`);
        throw err;
    }
};

//function to insert data in past guest table
const insertpastGuestData = async(user) => {
    try {
        const { guest_ID, username, first_Name, last_Name, phone_Number, address} = user;
        query = `INSERT INTO pastGuests (guest_ID, username, first_Name, last_Name, phone_Number, address)
        VALUES (?, ?, ?, ?, ?, ?);`;
        await pool.query(query, [guest_ID, username, first_Name, last_Name, phone_Number, address]);
        console.log('Insertion in the pastGuest table successful!');
        return true;
    } catch (err) {
        console.error(`Error while registering past guest : ${err}`);
        return false;
    }
};


//create table roomServiceUsed
const createTableRoomService = async() => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS room_service_utilized (
            guest_ID INTEGER PRIMARY KEY,
            room_number INTEGER NOT NULL,
            service_code CHAR(2) NOT NULL,
            service_cost INTEGER NOT NULL,
            created_At DATETIME DEFAULT CURRENT_TIMESTAMP
        );`;
        await pool.query(query);
        console.log(`Room service table created successfully!`);
    } catch (err) {
        console.log(`Error creating room service used table! : ${err}`);
    }
};

//function to fetch data from room service based on guest_ID
const fetchServiceData = async(guest_ID) => {
    try {
        const query = `SELECT * FROM room_service_utilized WHERE guest_ID = ?;`;
        const [rows] = await pool.query(query, [guest_ID]);
        return [rows];
    } catch (err) {
        console.error(`Error fetching data for user ${guest_ID} : ${err}`);
        throw err;
    }
};

//function to fetch all the data from room service
const fetchAllServiceData = async() => {
    try {
        const query = `SELECT * FROM room_service_utilized;`;
        const [rows] = await pool.query(query);
        return [rows];
    } catch (err) {
        console.error(`Error fetching data for user : ${err}`);
        throw err;
    }
};

//function to delete all the data 
const deleteServiceData = async(guest_ID) => {
    try {
        const query = `DELETE FROM room_service_utilized WHERE guest_ID = ?;`;
        await pool.query(query, [guest_ID]);
        console.log(`Deletion from room service utilized table successful!`);
    } catch (err) {
        console.error(`Error deleting data for user ${guest_ID} : ${err}`);
        throw err;
    }
};

//function to insert into room service utilized 
const insertServiceData = async(guest) => {
    try {
        const { guest_ID, room_Number, service_code, service_cost } = guest;
        const query = `INSERT INTO room_service_utilized (guest_ID, room_number, service_code, service_cost)
            VALUES (?, ?, ?, ?);
        `;
        await pool.query(query, [guest_ID, room_Number, service_code, service_cost]);
        console.log(`Insertion into room service utilized table successful!`);
    } catch (err) {
        console.error(`Error inserting data for user ${guest.guest_ID} : ${err}`);
        throw err;
    }
};

module.exports = {
    //guests model
    createGuestModel,
    fetchGuestData,
    fetchAllGuestData,
    deleteGuestData,
    insertGuestData,

    //pastGuests
    createPastGuestModel,
    fetchPastGuestData,
    fetchAllPastGuestData,
    deletePastGuestData,
    insertpastGuestData,

    //room_service_utilized
    createTableRoomService,
    fetchServiceData,
    fetchAllServiceData,
    deleteServiceData,
    insertServiceData
}