const express = require('express');

//function to view profile
const viewProfile = async(req, res) => {
    try {
        //business logic
        res.status(201).json({ message: 'Logout Successful!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//function to order room service
const roomService = async(req, res) => {
    try {
        //business logic
        res.status(201).json({ message: 'Logout Successful!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//function to generate a complaint
const generateComplaint = async(req, res) => {
    try {
        //business logic
        res.status(201).json({ message: 'Logout Successful!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//funciton to logout
const guestLogout = async(req, res) => {
    try {
        //business logic
        res.status(201).json({ message: 'Logout Successful!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

module.exports =  {
    viewProfile,
    roomService,
    generateComplaint,
    guestLogout
}