const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    // Shown struck-through next to price when higher than price
    originalPrice: { type: Number, min: 0 },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    images: [String],
    tag: String,
    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Easy' },
    bestSeason: String,
    groupSize: String,
    altitude: String,
    highlights: [String],
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
