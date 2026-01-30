const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Package = require('./models/packageModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Package.deleteMany();
        await User.deleteMany();

        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@safarchaska.com',
            password: 'password123',
            isAdmin: true,
        });

        const samplePackages = [
            {
                title: 'Mystical Chakrata Expedition',
                description: 'Explore the hidden gems of Chakrata, from Tiger Falls to Chilmiri Neck.',
                location: 'Chakrata, Uttarakhand',
                price: 4999,
                duration: '4 Days / 3 Nights',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800',
                category: 'Adventure',
                isFeatured: true,
                rating: 4.9,
                tag: 'Bestseller'
            },
            {
                title: 'Kedarkantha Winter Trek',
                description: 'The ultimate winter trek for snow lovers and mountain enthusiasts.',
                location: 'Sankri, Uttarakhand',
                price: 8499,
                duration: '6 Days / 5 Nights',
                image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=800',
                category: 'Trekking',
                isFeatured: true,
                rating: 5.0,
                tag: 'Winter Special'
            },
            {
                title: 'Spiti Valley Road Trip',
                description: 'Drive through the moonland of India and visit the highest villages.',
                location: 'Spiti, Himachal',
                price: 18999,
                duration: '9 Days / 8 Nights',
                image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
                category: 'Expedition',
                isFeatured: true,
                rating: 4.8,
                tag: 'Must Visit'
            },
            {
                title: 'Kasol & Tosh Escape',
                description: 'A relaxing trip to the Parvati Valley. Experience the hippie culture.',
                location: 'Parvati Valley, Himachal',
                price: 5999,
                duration: '3 Days / 2 Nights',
                image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800',
                category: 'Relaxation',
                isFeatured: true,
                rating: 4.7,
                tag: 'Popular'
            }
        ];

        await Package.insertMany(samplePackages);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
