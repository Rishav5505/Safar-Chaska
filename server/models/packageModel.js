const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    images: [String],
    itinerary: [{
        day: Number,
        title: String,
        activity: String
    }],
    inclusions: [String],
    exclusions: [String],
    isFeatured: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
