const bcrypt = require('bcrypt');
const {password} = require('../controllers/userHandler')

const rounds = 10;


//function to create the hash for the password
const createHashPassword = async () => {
    try{
        const hash = await bcrypt.hash(password, rounds);
        return hash;
    } catch (err) {
        console.error('Error while generating the hash.');
        throw err;
    }
};


//function to check for authentication
const compareHashPassword = async() => {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (err) {
        console.error('Error while comparing the password');
        throw err;
    }
}

module.exports = {
    createHashPassword,
    compareHashPassword,
};