const express = require('express');
const router = express.Router();
const {
    createCampaign,
    getCampaigns,
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaignController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCampaigns)
    .post(protect, admin, createCampaign);

router.route('/:id')
    .put(protect, admin, updateCampaign)
    .delete(protect, admin, deleteCampaign);

module.exports = router;
