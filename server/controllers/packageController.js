const Package = require('../models/packageModel');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
// Optional query: ?category=Adventure&search=kashmir&minPrice=5000&maxPrice=20000&featured=true&sort=price|-price|-rating|newest&limit=8
const SORTS = { price: { price: 1 }, '-price': { price: -1 }, '-rating': { rating: -1 }, newest: { createdAt: -1 } };

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getPackages = async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice, featured, sort, limit } = req.query;
        const filter = {};

        if (category && category !== 'All') filter.category = category;
        if (featured === 'true') filter.isFeatured = true;
        if (search) {
            const rx = new RegExp(escapeRegex(String(search).slice(0, 60)), 'i');
            filter.$or = [{ title: rx }, { location: rx }, { description: rx }];
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        let query = Package.find(filter).sort(SORTS[sort] || { isFeatured: -1, createdAt: -1 });
        const max = parseInt(limit, 10);
        if (max > 0) query = query.limit(Math.min(max, 100));

        const packages = await query;
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get package by ID
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (package) {
            res.json(package);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
    try {
        const fields = ['title', 'description', 'location', 'price', 'originalPrice', 'duration', 'image', 'category', 'images', 'tag', 'rating', 'reviewCount', 'difficulty', 'bestSeason', 'groupSize', 'altitude', 'highlights', 'itinerary', 'inclusions', 'exclusions', 'isFeatured'];
        const data = Object.fromEntries(fields.filter((f) => req.body[f] !== undefined).map((f) => [f, req.body[f]]));
        const package = new Package(data);
        const createdPackage = await package.save();
        res.status(201).json(createdPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (package) {
            Object.assign(package, req.body);
            const updatedPackage = await package.save();
            res.json(updatedPackage);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (package) {
            await package.deleteOne();
            res.json({ message: 'Package removed' });
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPackages, getPackageById, createPackage, updatePackage, deletePackage };
