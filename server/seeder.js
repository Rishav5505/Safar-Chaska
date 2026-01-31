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
                title: "Chakrata Bliss",
                description: "Explore the hidden gems of Chakrata, from Tiger Falls to Chilmiri Neck.",
                location: "Uttarakhand",
                price: 4999,
                duration: "3D/2N",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800",
                category: "Adventure",
                isFeatured: true,
                tag: "Bestseller"
            },
            {
                title: "Spiti Valley Circuit",
                description: "Drive through the moonland of India and visit the highest villages.",
                location: "Himachal Pradesh",
                price: 21999,
                duration: "9D/8N",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
                category: "Adventure",
                isFeatured: true,
                tag: "Trending"
            },
            {
                title: "Manali Aurora",
                description: "Experience the magic of Manali with snow-capped peaks and local culture.",
                location: "Himachal Pradesh",
                price: 8999,
                duration: "5D/4N",
                rating: 5.0,
                image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
                category: "Adventure",
                isFeatured: true,
                tag: "Premium"
            },
            {
                title: "Rishikesh Yoga Retreat",
                description: "A peaceful retreat by the Ganges. Perfect for spiritual seekers.",
                location: "Uttarakhand",
                price: 3999,
                duration: "3D/2N",
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
                category: "Wellness",
                isFeatured: false,
                tag: "Peaceful"
            },
            {
                title: "Rajasthan Royale",
                description: "Experience the royal heritage and desert magic of Rajasthan.",
                location: "Rajasthan",
                price: 12999,
                duration: "6D/5N",
                rating: 4.9,
                image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800",
                category: "Culture",
                isFeatured: true,
                tag: "Heritage"
            },
            {
                title: "Leh Ladakh Expedition",
                description: "The ultimate road trip to the land of high passes.",
                location: "Ladakh",
                price: 14999,
                duration: "6D/5N",
                rating: 5.0,
                image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&q=80&w=800",
                category: "Adventure",
                isFeatured: true,
                tag: "Must Visit"
            },
            {
                title: "Kashmir Paradise",
                description: "Witness the heaven on earth with Shikara rides and snow valleys.",
                location: "J&K",
                price: 18999,
                duration: "8D/7N",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800",
                category: "Honeymoon",
                isFeatured: true,
                tag: "Bestseller"
            },
            {
                title: "Sikkim Explorer",
                description: "Discover the pristine beauty of North East India.",
                location: "Sikkim",
                price: 24999,
                duration: "13D/12N",
                rating: 5.0,
                image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
                category: "Culture",
                isFeatured: false,
                tag: "Educational"
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
