const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');

// Short human-friendly reference, e.g. SC-7K2QX9
const makeBookingRef = () => 'SC-' + Math.random().toString(36).slice(2, 8).toUpperCase();

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const addBookingItems = async (req, res) => {
    try {
        const { packageId, userName, email, phone, travelDate, guests, specialRequests } = req.body;

        const pkg = await Package.findById(packageId);
        if (!pkg) {
            return res.status(404).json({ message: 'Selected package no longer exists' });
        }

        const date = new Date(travelDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(date) || date < today) {
            return res.status(400).json({ message: 'Please choose a future travel date' });
        }

        const guestCount = Math.max(1, parseInt(guests, 10) || 1);

        const booking = new Booking({
            packageId, userName, email, phone, specialRequests,
            travelDate: date,
            guests: guestCount,
            totalPrice: pkg.price * guestCount,
            bookingRef: makeBookingRef()
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
        const bookings = await Booking.find({}).populate('packageId', 'title price').sort('-createdAt');
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
        const [totalBookings, pendingBookings, confirmedBookings, revenueAgg] = await Promise.all([
            Booking.countDocuments(),
            Booking.countDocuments({ status: 'pending' }),
            Booking.countDocuments({ status: 'confirmed' }),
            // Only confirmed bookings count as revenue
            Booking.aggregate([
                { $match: { status: 'confirmed' } },
                { $group: { _id: null, total: { $sum: '$totalPrice' } } }
            ])
        ]);

        res.json({
            totalBookings,
            revenue: revenueAgg[0]?.total || 0,
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
