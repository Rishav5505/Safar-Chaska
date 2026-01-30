const express = require('express');
const router = express.Router();
const { addBookingItems, getBookings } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', addBookingItems);
router.get('/', protect, admin, getBookings);

module.exports = router;
