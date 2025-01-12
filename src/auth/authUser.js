const { getUserByUsername } = require('../models/userModel');
const { compareHashPassword } = require('../utils/hashPassword');
const { generateToken, verifyToken } = require('../auth/authToken');

//verifying login credentials
const verifyCredentials = async(user) => {
    try {
        const result = await getUserByUsername(user.username);
        const verifyPassword = await compareHashPassword(user.password, result.hashed_password);
        if(verifyPassword) {
            const token = generateToken(user.username);
            return token;
        }
        else return null;
    } catch (err) {
        throw new Error('Error verifying credentials');
    }
};

module.exports = {
    verifyCredentials,
}

