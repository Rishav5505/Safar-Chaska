import heroImg from '../assets/IMG_2235.JPG.jpeg';
import other1 from '../assets/IMG_2237.JPG.jpeg';
import other2 from '../assets/IMG_2239.JPG.jpeg';
import other3 from '../assets/IMG_3175.JPG.jpeg';
import other4 from '../assets/IMG_5983.JPG.jpeg';
import other5 from '../assets/IMG_7994.JPG.jpeg';
import other6 from '../assets/IMG_8022.JPG.jpeg';

export const chakrataData = {
    id: "chakrata",
    name: "Chakrata",
    state: "Uttarakhand",
    tagline: "Hidden Gem of Uttarakhand",
    description: "Chakrata is a picturesque cantonment town in the Dehradun district of Uttarakhand, situated at an altitude of about 7,000 feet. Unlike other popular hill stations, Chakrata has managed to retain its pristine beauty and tranquility, making it perfect for those seeking peace amidst nature. The town offers breathtaking views of the Himalayan ranges, dense forests of oak and rhododendron, and numerous trekking trails.",
    location: "Dehradun district, Uttarakhand",
    altitude: "2,118 meters (6,949 ft)",
    climate: "Cool climate throughout the year",
    distanceFromDelhi: "Approx 320 km",
    winterTemp: "0°C to 10°C (Dec-Feb)",

    images: {
        hero: heroImg,
        others: [
            other1,
            other2,
            other3,
            other4,
            other5,
            other6
        ]
    },


    packageHighlights: [
        { title: "Best Locations", desc: "Cover all major attractions" },
        { title: "Comfort Stay", desc: "3-star equivalent hotels" },
        { title: "Delicious Meals", desc: "Breakfast & Dinner included" },
        { title: "24/7 Support", desc: "Dedicated trip manager" }
    ],

    packageSummary: {
        duration: "4 Days / 3 Nights",
        destinations: "Chakrata, Tiger Falls, Deoban, Kanasar",
        stay: "3 Nights in comfortable hotels/resorts",
        meals: "Breakfast & Dinner (3 Breakfasts + 3 Dinners)",
        sightseeing: "All major attractions as per itinerary",
        transport: "Dehradun to Dehradun (Optional)"
    },

    bestTime: "March to June & Sept to Nov",
    bestSeason: "March to June & Sept to Nov",

    howToReach: [
        { mode: "Flight", details: "Nearest airport is Jolly Grant Airport, Dehradun (115 km away). Regular flights from Delhi, Mumbai, and Bangalore." },
        { mode: "Train", details: "Nearest railway station is Dehradun (87 km). Well connected to major cities. Taxi/bus available from station." },
        { mode: "Road", details: "Well connected by motorable roads. Direct buses from Dehradun ISBT. Private taxis also available." }
    ],

    attractions: [
        {
            name: "Tiger Falls",
            description: "Highest direct waterfall in Uttarakhand with lush green forest trek",
            image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&q=80&w=600"
        },
        {
            name: "Deoban",
            description: "Forest of gods with panoramic Himalayan views and dense Deodar forests",
            image: "https://images.unsplash.com/photo-1589363354966-22a36d2994e4?auto=format&fit=crop&q=80&w=600"
        },
        {
            name: "Kanasar",
            description: "Famous for its ancient cedar forest and serene environment",
            image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=600"
        },
        {
            name: "Budher Caves",
            description: "Ancient limestone caves perfect for adventure seekers",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=600"
        },
        {
            name: "Chilmiri Neck",
            description: "Stunning sunset point with breathtaking valley views",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600"
        }
    ],

    activities: [
        "Trekking to Tiger Falls",
        "Forest Walks",
        "Bird Watching",
        "Photography",
        "Nature Exploration",
        "Camping"
    ],

    itinerary: [
        {
            day: 1,
            title: "Arrival in Chakrata",
            desc: "Arrive at Dehradun (pickup can be arranged). Scenic drive to Chakrata (90 km, approx 4 hours). Check-in to your hotel/resort. Evening at leisure - explore local market. Dinner and overnight stay in Chakrata."
        },
        {
            day: 2,
            title: "Tiger Falls & Local Sightseeing",
            desc: "After breakfast, visit Tiger Falls (highest direct waterfall in Uttarakhand). Trek through lush green forests to reach the falls. Picnic lunch near the falls. Visit Budher Caves (optional). Return to hotel, dinner and overnight stay."
        },
        {
            day: 3,
            title: "Deoban & Kanasar Excursion",
            desc: "Morning visit to Deoban (meaning 'forest of gods'). Walk through dense Deodar forests with panoramic views. Proceed to Kanasar - famous for its cedar forest. Visit Chilmiri Neck sunset point. Return to hotel, dinner and overnight stay."
        },
        {
            day: 4,
            title: "Departure",
            desc: "Morning at leisure - last minute shopping. Check-out from hotel. Drive back to Dehradun. Drop at railway station/airport (optional). Tour concludes with wonderful memories."
        }
    ],

    packages: [
        {
            id: 1,
            name: "Standard Package",
            duration: "4D/3N",
            price: 6499,
            features: ["3-star Hotels", "Breakfast & Dinner", "Sightseeing", "Tour Manager"]
        }
    ],

    inclusions: [
        "3 nights accommodation in standard hotel/resort",
        "3 breakfasts and 3 dinners",
        "Sightseeing as per itinerary",
        "All applicable taxes",
        "Tour manager assistance",
        "First aid kit (carry your personal medicines)"
    ],

    exclusions: [
        "Transport to/from Dehradun (can be arranged at extra cost)",
        "Lunches during the tour",
        "Entry fees to monuments/museums",
        "Personal expenses like laundry, phone calls, etc.",
        "Anything not mentioned in inclusions",
        "Travel insurance (recommended)"
    ],

    reviews: [
        { user: "Priya Sharma", rating: 5, comment: "Amazing experience! The Tiger Falls trek was breathtaking. Safar Chaska team made everything so smooth." },
        { user: "Rahul Verma", rating: 5, comment: "Perfect getaway from city chaos. Loved the peaceful environment and professional service." },
        { user: "Anjali Gupta", rating: 4, comment: "Great package! Food was delicious and hotels were comfortable. Highly recommended." }
    ],

    faqs: [
        {
            question: "Can we extend our stay in Chakrata?",
            answer: "Yes, absolutely! We can customize the package according to your preferences. Contact us for personalized changes."
        },
        {
            question: "Is transport from Dehradun included?",
            answer: "Transport from Dehradun can be arranged at an additional cost. Please mention your requirement while booking."
        },
        {
            question: "What is the difficulty level of Tiger Falls trek?",
            answer: "The trek is moderate and suitable for beginners. It takes about 2-3 hours with beautiful forest trails."
        },
        {
            question: "Are there ATMs in Chakrata?",
            answer: "Yes, there are a few ATMs in Chakrata town, but we recommend carrying sufficient cash for emergencies."
        }
    ],

    contact: {
        email: "info@safarchaska.com",
        phone: "+91 8171379469",
        whatsapp: "918171379469"
    }
};
