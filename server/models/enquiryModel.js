const mongoose = require('mongoose');

// Lightweight lead: contact form messages and "request a callback" requests
const enquirySchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    message: { type: String, maxlength: 2000 },
    source: { type: String, enum: ['contact', 'callback', 'package'], default: 'contact' },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, {
    timestamps: true
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
