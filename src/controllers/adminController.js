const express = require('express');

//function to register user
const registration = async(req, res) => {
    try {
        //business logic
        res.status(201).json({ message: 'Guest Account created sucessfully!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//function to search user
const searchGuest = async(req, res) => {
    try {
        //business logic
        res.status(200).json({ message: 'Guest Found' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//function to generate Bill
const generateBill = async(req, res) => {
    try {
        //business logic
        res.status(200).json({ message: 'Bill Generated!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//function to view complaints
const viewComplaints = async(req, res) => {
    try {
        //business logic
        res.status(200).json({ message: 'Complaints fetched!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//function to logout
const adminLogout = async(req, res) => {
    try {
        //business logic
        res.status(201).json({ message: 'Logout Successful!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.send(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

module.exports = {
    registration,
    searchGuest,
    generateBill,
    viewComplaints,
    adminLogout
}