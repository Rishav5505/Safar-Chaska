const Enquiry = require('../models/enquiryModel');

// @desc    Submit a contact message or callback request
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
    try {
        const { name, phone, email, message, source, packageId } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ message: 'Name and phone are required' });
        }
        const enquiry = await Enquiry.create({ name, phone, email, message, source, packageId: packageId || undefined });
        res.status(201).json({ _id: enquiry._id, message: 'Thanks! Our team will reach out shortly.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    List enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find({}).populate('packageId', 'title').sort('-createdAt');
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
const updateEnquiryStatus = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        enquiry.status = req.body.status || enquiry.status;
        res.json(await enquiry.save());
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiryStatus };
