const pool = require('../config/dbconfig');

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
    } catch (err) {
        console.log(`Error creating table : ${err}`);
    }
};

const createRoomServiceTable = async () => {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS room_service (
            Guest_ID INT NOT NULL,
            Room_Num INT,
            Service_Cost INT,
            Service_Code CHAR(2)
        );
        `;
        
        await pool.query(createTableQuery);
        console.log('Table room_service created successfully!');
    } catch (err) {
        console.log(`Error creating table: ${err}`);
    }
};

const insertRoomValues = async(roomAvail) => {
    try {
        query = `INSERT INTO roomAvailability VALUES (?, ?, ?, ?);`;
        const { roomName, roomCode, roomCosts, roomAvailable } = roomAvail;
        await pool.query(query, [roomName, roomCode, roomCosts, roomAvailable]);
        console.log('Insertion of record successful!');
    } catch (err) {
        console.error(`Error inserting records : ${err}`);
    }
};

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


const main = async () => {
    await createRoomTable();
    await insertAllRoomValues();
    await createRoomServiceTable();
};

main().catch(err => console.error(`Error in main execution: ${err}`));




module.exports = {
  createRoomTable,
  insertRoomValues,
  createRoomServiceTable,
  insertAllRoomValues,
};