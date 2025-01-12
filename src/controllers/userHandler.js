const { createUser, 
    getUserByUsername,
    updateUser,
    deleteUser,
} = require('../models/userModel');
const { compareHashPassword, createHashPassword } = require('../utils/hashPassword');

//function handler to create user during registration
const createUserHandler = async(req, res) => {
    try {
        const hashPassword = await createHashPassword(req.body.password);
        const user = {
            username: req.body.username,
            email: req.body.email,
            hashed_password: hashPassword
        }
        await createUser(user);
        res.status(201).send('User Successfully Created!');
    } catch (err) {
        res.status(500).send('An Error Occured! User cannot be created.');
    }
};


//function handler to get user by username
const getUserByUsernameHandler = async(req, res) => {
    try {
        const user = await getUserByUsername(req.params.username);
        if(user) res.json(user);
        else res.status(404).send('User not found!');
    } catch(err) {
        res.status(500).send('An Error Occured! Values cannot be updated.');
    }
};


//function handler to update user information
const updateUserHandler = async() => {
    //empty for now
};


//function handler to delete user from database
const deleteUserHandler = async(req, res) => {
    try {
        const result = await deleteUser(res.params.username);
        if(result.affectedRows === 0) res.status(404).send('User not found!'); //given user not found
        else res.status(204).send('User successfullY Deleted!'); //user found and deleted
    } catch(err) {
        res.status(500).send('An Error Occured! User cannot be deleted.');
    }
};

module.exports = {
    createUserHandler,
    getUserByUsernameHandler,
    updateUserHandler,
    deleteUserHandler,
};