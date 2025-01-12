const { getUserByUsername } = require('../models/userModel');
const { compareHashPassword } = require('../utils/hashPassword');
const { generateToken, verifyToken } = require('../auth/authToken');

const verifyCredentials = async(user) => {
    try {
        const result = await getUserByUsername(user.params.username);
        const verifyPassword = await compareHashPassword(user.params.password, result.hashed_password);
        if(verifyPassword) {
            const token = generateToken(user.params.username);
            return token;
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    verifyCredentials,
}

