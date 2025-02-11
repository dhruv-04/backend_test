const express = require('express');
const router = express.Router();
const { viewProfile, generateComplaint, roomService, guestLogout } = require('../controllers/GuestController');

//endpoint to view profile
router.get('/profile/:username', viewProfile);

//endpoint to order for room service
router.post('/profile/:username/roomService', roomService)

//endpoint to generate a complaint
router.post('/generateComplaint', generateComplaint);

//endpoint to logout 
router.post('/logout', guestLogout);

module.exports = router;