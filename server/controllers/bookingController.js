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
        const bookings = await Booking.find({}).populate('packageId', 'title').sort('-createdAt');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/bookings/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const bookings = await Booking.find({});

        // Simple logic for revenue (sum of prices of all bookings)
        // Note: Real world would use package prices from populated data
        const revenue = bookings.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });

        res.json({
            totalBookings,
            revenue,
            pendingBookings,
            confirmedBookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = req.body.status || booking.status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBookingItems, getBookings, getDashboardStats, updateBookingStatus };
