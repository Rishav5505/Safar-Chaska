const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
