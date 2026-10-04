const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, updateEnquiryStatus } = require('../controllers/enquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', createEnquiry);
router.get('/', protect, admin, getEnquiries);
router.put('/:id/status', protect, admin, updateEnquiryStatus);

module.exports = router;
