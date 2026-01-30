const Booking = require('../models/bookingModel');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const addBookingItems = async (req, res) => {
    try {
        const { packageId, userName, email, phone, travelDate, guests } = req.body;
        const booking = new Booking({
            packageId, userName, email, phone, travelDate, guests
        });
        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('packageId', 'title');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBookingItems, getBookings };
