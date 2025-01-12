require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

//generate token 
const generateToken = (username) => {
    try {
        const token = jwt.sign({ username }, secretKey, { expiresIn: "1m" });
        return token;
    } catch(err) {
        throw err;
    }
}

//verification of JWT Token 
const verifyToken = (token) => {
    try {
        const result = jwt.verify(token, secretKey);
        return result; //returns a json object containing email, ist, exp
    } catch (err) {
        throw err; //returns errors whether it's empty or invalid
    }
}

//functions exports
module.exports = {
    generateToken,
    verifyToken,
}
