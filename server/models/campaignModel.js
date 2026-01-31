const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Coupons', 'Flash', 'Banners', 'Trust']
    },
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String }, // For Coupons
    discount: { type: Number }, // For Coupons
    multiplier: { type: Number }, // For Trust
    imageUrl: { type: String }, // For Banners
    targetLink: { type: String }, // For Banners
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
