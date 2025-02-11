const express = require('express');
const router = express.Router();
const { registration, searchGuest, generateBill, viewComplaints, adminLogout } = require('../controllers/adminController');

//endpoint to register user
router.post('/registration', registration);

//endpoint to search the user
router.get('/searchGuest/:id', searchGuest);

//endpoint to generate the bill of the user
router.get('/generateBill/:id', generateBill);

//endPoint to view complaints
router.get('/viewComplaints', viewComplaints);

//endpoint to logout the admin
router.post('/logout', adminLogout);

module.exports = router;