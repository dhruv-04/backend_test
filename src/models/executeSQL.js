const pool = require('../config/dbconfig');
const { createAdminModel, insertAdminValue } = require('./adminModel');
const  { createGuestModel, createPastGuestModel } = require('./guestModel');
const { createRoomTable, createRoomServiceTable, insertAllRoomServiceValues, insertAllRoomValues } = require('./hotelModel');

const executeSQL = async() => {
    try {
        await createAdminModel();
        await createGuestModel();
        await createPastGuestModel();
        await createRoomTable();
        await createRoomServiceTable();
        const admin = { username: "admin", hashed_password: "$2a$10$zkzcY4SeavlwJMyHQjNdnuLitXnBEIRp2jqmttr.2BW7kOCfcBh.i"}; //password: admin123
        await insertAdminValue(admin);
        await insertAllRoomServiceValues();
        await insertAllRoomValues();
        console.log('All tables created & records inserted successfully!');
    } catch (err) {
        console.error(`Error creating tables : ${err}`);
    }
};

executeSQL();