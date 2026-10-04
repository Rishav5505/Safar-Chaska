// Non-destructive package seed: inserts new packages and updates existing ones (matched by title).
// Never deletes packages, users or bookings — safe to run against production.
// Usage: node seedPackages.js
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Package = require('./models/packageModel');
const connectDB = require('./config/db');
const packages = require('./data/packages');

dotenv.config();

const run = async () => {
    await connectDB();
    let created = 0, updated = 0;

    for (const pkg of packages) {
        const res = await Package.updateOne({ title: pkg.title }, { $set: pkg }, { upsert: true, runValidators: true });
        if (res.upsertedCount) created++;
        else if (res.modifiedCount) updated++;
    }

    console.log(`Packages seeded: ${created} created, ${updated} updated, ${packages.length - created - updated} unchanged.`);
    await mongoose.disconnect();
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
