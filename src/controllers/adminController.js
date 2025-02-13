const express = require('express');

//function to register user
const registration = async(req, res) => {
    try {
        //business logic
        const { insertGuestData } = require('../models/guestModel');
        await insertGuestData(req.body);
        res.status(201).json({ message: 'Guest Account created sucessfully!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.status(500).json({ message : 'Error inserting records in the server!', error: err.message });
    } 
};

//function to search all users
const searchAllGuest = async(req, res) => {
    try {
        //business logic
        const { fetchAllGuestData } = require('../models/guestModel');
        const [record] = await fetchAllGuestData();
        if(record.length > 0) {
            res.status(200).json({ message: 'Guests Found', data: record });
        } else {
            res.status(404).json({ message: "Records not found!" });
        }
    } catch (err) {
        console.log(`Error fetching details : ${err}`);
        res.status(500).json({ message : 'Error fetching details from server', error: err.message });
    } 
};

//function to search user
const searchGuest = async(req, res) => {
    try {
        //business logic
        const guest_ID = req.params.guest_ID;
        const { fetchGuestData } = require('../models/guestModel');
        const [record] = await fetchGuestData(guest_ID);
        if(record.length > 0) {
            res.status(200).json({ message: 'Guest Found', data: record });
        } else {
            res.status(404).json({ message: "Record not found!" });
        }
    } catch (err) {
        console.log(`Error fetching details : ${err}`);
        res.status(500).json({ message : 'Error fetching details from server', error: err.message });
    } 
};

//function to generate Bill
const generateBill = async(req, res) => {
    try {
        //business logic
        res.status(200).json({ message: 'Bill Generated!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.status(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

//function to view complaints
const viewGuestComplaints = async(req, res) => {
    try {
        //business logic
        const guest_ID = req.params.guest_ID;
        const { fetchGuestData } = require('../models/guestModel');
        const guest = await fetchGuestData(guest_ID);

        //check if guest exists or not
        if(guest[0].length > 0) {
            const { fetchComplaint } = require('../models/hotelModel');
            const complaints = await fetchComplaint(guest_ID);

            //check if complaints exist or not
            if(complaints[0].length > 0) {
                res.status(200).json({ message: 'Complaints fetched!', data: complaints });
            } else {
                res.status(200).json({ message: 'No Complaints Found!' });
            }
        } else {
            res.status(404).json({ message: "Guest ID not found! "});
        }
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.status(500).json({ message : 'ERROR FETCHING COMPLAINTS', error: err.message });
    } 
};

//function to view complaints
const viewComplaints = async(req, res) => {
    try {
        //business logic
        const { fetchAllComplaints } = require('../models/hotelModel');
        const complaints = await fetchAllComplaints();
        if(complaints[0].length > 0) {
            res.status(200).json({ message: 'Complaints fetched!', data: complaints });
        } else {
            res.status(200).json({ message: 'No Complaints Found!'});
        }
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.status(500).json({ message : 'ERROR FETCHING COMPLAINTS', error: err.message });
    } 
};

//function to logout
const adminLogout = async(req, res) => {
    try {
        //business logic
        res.status(201).json({ message: 'Logout Successful!' });
    } catch (err) {
        console.log(`Error creating guest account : ${err}`);
        res.status(500).json({ message : 'INTERNAL SERVER ERROR', error: err.message });
    } 
};

module.exports = {
    registration,
    searchGuest,
    searchAllGuest,
    generateBill,
    viewComplaints,
    viewGuestComplaints,
    adminLogout
}