const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    travelDate: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1, max: 50 },
    specialRequests: { type: String, maxlength: 1000 },
    // Computed on the server from the package price so clients can't tamper with it
    totalPrice: { type: Number, default: 0 },
    bookingRef: { type: String, unique: true, sparse: true },
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
