const express = require('express');
const router = express.Router();
const { registration, searchGuest, generateBill, viewComplaints, adminLogout, viewGuestComplaints, searchAllGuest } = require('../controllers/adminController');

//endpoint to register user
router.post('/registration', registration);

//endpoint to search all the users
router.get('/searchGuests', searchAllGuest);

//endpoint to search the user
router.get('/searchGuest/:guest_ID', searchGuest);

//endpoint to generate the bill of the user
router.get('/generateBill/:guest_ID', generateBill);

//endPoint to view complaints
router.get('/viewComplaints', viewComplaints);

//endPoint to view guest complaints
router.get('/viewComplaints/:guest_ID', viewGuestComplaints);

//endpoint to logout the admin
router.delete('/logout', adminLogout);

module.exports = router;