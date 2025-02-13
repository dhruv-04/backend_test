const pool = require('../config/dbconfig');


//function to create Room Table
const createRoomTable = async () => {   
    try {    
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS roomAvailability (
            Room_Name VARCHAR(30),
            Room_Code CHAR(2),
            Room_Costs INTEGER,
            Room_Available INTEGER
        );
        `;
        await pool.query(createTableQuery);
        console.log(`Room Table created successfully!`);
    } catch (err) {
        console.log(`Error creating table : ${err}`);
    }
};

//function to insert values in Room Table
const insertRoomValues = async(roomAvail) => {
    try {
        query = `INSERT INTO roomAvailability VALUES (?, ?, ?, ?);`;
        const { roomName, roomCode, roomCosts, roomAvailable } = roomAvail;
        await pool.query(query, [roomName, roomCode, roomCosts, roomAvailable]);
        console.log('Insertion of record successful!');
    } catch (err) {
        console.error(`Error inserting records : ${err}`);
        throw err;
    }
};

//function to insert initial values in Room Value table
const insertAllRoomValues = async () => {
    const roomValues = [
        { roomName: 'DOUBLE BED ROOM', roomCode: 'DB', roomCosts: 7000, roomAvailable: 79 },
        { roomName: 'LUXURY ROOM', roomCode: 'LB', roomCosts: 15000, roomAvailable: 20 },
        { roomName: 'SINGLE BED ROOM', roomCode: 'SB', roomCosts: 5000, roomAvailable: 100 },
    ];

    for (const room of roomValues) {
        await insertRoomValues(room);
    }
};

// Function to fetch all room availability
const fetchAllRoomAvailability = async () => {
    try {
        const query = `SELECT * FROM roomAvailability;`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.error(`Error fetching all room availability: ${err}`);
        throw err;
    }
};

// Function to fetch room availability based on room code
const fetchRoomAvailability = async (roomCode) => {
    try {
        const query = `SELECT * FROM roomAvailability WHERE Room_Code = ?;`;
        const [rows] = await pool.query(query, [roomCode]);
        return rows;
    } catch (err) {
        console.error(`Error fetching room availability for room code ${roomCode}: ${err}`);
        throw err;
    }
};


//function to create Room Service Table
const createRoomServiceTable = async () => {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS room_service (
            Service_Name VARCHAR(50),
            Service_Cost INT,
            Service_Code CHAR(2)
        );
        `;
        await pool.query(createTableQuery);
        console.log('Table room_service created successfully!');
    } catch (err) {
        console.log(`Error creating table: ${err}`);
        throw err;
    }
};



//function to insert values in Room Service
const insertRoomServiceValues = async(roomService) => {
    try {
        const query = `INSERT INTO room_service VALUES (?, ?, ?);`;
        const { Service_Name, Service_Cost, Service_Code } = roomService;
        await pool.query(query, [Service_Name, Service_Cost, Service_Code]);
        console.log('Insertion of record successful!');
    } catch (err) {
        console.error(`Error inserting records : ${err}`);
        throw err;
    }
};


//funciton to insert intial values in Room Service table
const insertAllRoomServiceValues = async () => {
    const roomServiceValues = [
        { Service_Name: "Water", Service_Code: "W", Service_Cost: 50 },
        { Service_Name: "Tea/Coffee", Service_Code: "T", Service_Cost: 50 },
        { Service_Name: "Juice", Service_Code: "J", Service_Cost: 30 },
        { Service_Name: "Cleaning", Service_Code: "C", Service_Cost: 0 }
    ];

    for (const roomService of roomServiceValues) {
        await insertRoomServiceValues(roomService);
    }
};

// Function to fetch all room service
const fetchAllRoomService = async () => {
    try {
        const query = `SELECT * FROM room_service;`;
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.error(`Error fetching all room service: ${err}`);
        throw err;
    }
};

// Function to fetch room service based on service code
const fetchRoomService = async (serviceCode) => {
    try {
        const query = `SELECT * FROM room_service WHERE Service_Code = ?;`;
        const [rows] = await pool.query(query, [serviceCode]);
        return rows;
    } catch (err) {
        console.error(`Error fetching room service for service code ${serviceCode}: ${err}`);
        throw err;
    }
};


// Function to create Complaint Table
const createComplaintTable = async () => {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS complaints (
            guest_ID INTEGER,
            username VARCHAR(50) NOT NULL,
            room_number INTEGER NOT NULL,
            complaint TEXT
        );
        `;
        await pool.query(createTableQuery);
        console.log('Table complaints created successfully!');
    } catch (err) {
        console.log(`Error creating table: ${err}`);
        throw err;
    }
};

// Function to fetch all complaints
const fetchAllComplaints = async () => {
    try {
        const query = `SELECT * FROM complaints;`;
        const [rows] = await pool.query(query);
        return [rows];
    } catch (err) {
        console.error(`Error fetching all complaints: ${err}`);
        throw err;
    }
};

// Function to fetch a complaint based on guest_ID
const fetchComplaint = async (guest_ID) => {
    try {
        const query = `SELECT * FROM complaints WHERE guest_ID = ?;`;
        const [rows] = await pool.query(query, [guest_ID]);
        return [rows];
    } catch (err) {
        console.error(`Error fetching complaint for guest_ID ${guest_ID}: ${err}`);
        throw err;
    }
};

// Function to insert a complaint
const insertComplaint = async (complaintData) => {
    try {
        const { guest_ID, username, room_number, complaint } = complaintData;
        const query = `INSERT INTO complaints (guest_ID, username, room_number, complaint) VALUES (?, ?, ?, ?);`;
        await pool.query(query, [guest_ID, username, room_number, complaint]);
        console.log('Insertion of complaint successful!');
    } catch (err) {
        console.error(`Error inserting complaint: ${err}`);
        throw err;
    }
};

// Function to delete a complaint based on guest_ID
const deleteComplaint = async (guest_ID) => {
    try {
        const query = `DELETE FROM complaints WHERE guest_ID = ?;`;
        await pool.query(query, [guest_ID]);
        console.log(`Deletion of complaint for guest_ID ${guest_ID} successful!`);
    } catch (err) {
        console.error(`Error deleting complaint for guest_ID ${guest_ID}: ${err}`);
        throw err;
    }
};

module.exports = {
    // roomAvailability
    createRoomTable,
    insertRoomValues,
    insertAllRoomValues,
    fetchAllRoomAvailability,
    fetchRoomAvailability,

    // room service
    createRoomServiceTable,
    insertAllRoomServiceValues,
    insertRoomServiceValues,
    fetchAllRoomService,
    fetchRoomService,

    // complaints
    createComplaintTable,
    fetchAllComplaints,
    fetchComplaint,
    insertComplaint,
    deleteComplaint,
};