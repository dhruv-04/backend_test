const pool = require('../config/dbconfig');

//function to create Admin model
const createAdminModel = async() => {
    try {
        const createQuery = `CREATE TABLE IF NOT EXISTS admin (
            username VARCHAR(25) PRIMARY KEY NOT NULL,
            hashed_password VARCHAR(255) NOT NULL
        );`
        await pool.query(createQuery);
        console.log('Admin table created successfully!');
    } catch (err) {
        console.error(`Error creating admin table : ${err}`);
    }
};

const insertAdminValue = async(admin) => {
    try {
        const  { username, hashed_password } = admin;
        const query = `INSERT INTO admin VALUES (?, ?);`;
        await pool.query(query, [username, hashed_password]);
        console.log('Data Inserted in adminModel!');
    } catch (err) {
        console.error(`Error inserting the record : ${err}`);
        throw err;
    }
};

//function to delete a record from the admin model
const deleteAdminValue = async (username) => {
    try {
      const query = `DELETE FROM admin WHERE username = ?;`;
      await pool.query(query, [username]);
      console.log('Record deleted from adminModel!');
      return true;
    } catch (err) {
      console.error(`Error deleting the record: ${err}`);
      return false;
    }
  };

//Function to read data from admin model
const fetchRecord = async (username) => {
  try {
    const query = `SELECT * FROM admin WHERE username = ?;`;
    const [rows] = await pool.query(query, [username]);
    return rows;
  } catch (err) {
    console.error(`Error fetching record: ${err}`);
    throw err;
  }
};

module.exports = {
  createAdminModel,
  insertAdminValue,
  fetchRecord,
  deleteAdminValue
};