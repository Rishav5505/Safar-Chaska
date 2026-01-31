const Campaign = require('../models/campaignModel');

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Private/Admin
const createCampaign = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        const createdCampaign = await campaign.save();
        res.status(201).json(createdCampaign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({}).sort('-createdAt');
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update campaign status
// @route   PUT /api/campaigns/:id
// @access  Private/Admin
const updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (campaign) {
            campaign.isActive = req.body.isActive !== undefined ? req.body.isActive : campaign.isActive;
            const updatedCampaign = await campaign.save();
            res.json(updatedCampaign);
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Private/Admin
const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (campaign) {
            await campaign.deleteOne();
            res.json({ message: 'Campaign removed' });
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCampaign,
    getCampaigns,
    updateCampaign,
    deleteCampaign
};
