const express = require('express');
const router = express.Router();
const { addBookingItems, getBookings, getDashboardStats, updateBookingStatus } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', addBookingItems);
router.get('/stats', protect, admin, getDashboardStats);
router.get('/', protect, admin, getBookings);
router.put('/:id/status', protect, admin, updateBookingStatus);

module.exports = router;
