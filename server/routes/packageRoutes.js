const express = require('express');
const router = express.Router();
const { getPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', protect, admin, createPackage);
router.put('/:id', protect, admin, updatePackage);
router.delete('/:id', protect, admin, deletePackage);

module.exports = router;
