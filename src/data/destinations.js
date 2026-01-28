export const destinationsData = {
    chakrata: {
        id: "chakrata",
        name: "Chakrata",
        title: "Chakrata - Hidden Gem of Uttarakhand",
        state: "Uttarakhand",
        tagline: "Hidden Gem of Uttarakhand",
        description: "Chakrata is a picturesque cantonment town in the Dehradun district of Uttarakhand, situated at an altitude of about 7,000 feet. Perfect for those seeking peace amidst nature, offering breathtaking views of the Himalayan ranges.",
        altitude: "2,118 meters",
        winterTemp: "0°C to 10°C",
        images: {
            hero: "https://images.unsplash.com/photo-5196813937844-d120267933ba?auto=format&fit=crop&q=80&w=1600",
        },
        packageSummary: {
            duration: "4 Days / 3 Nights",
            price: "4,999",
            destinations: "Tiger Falls, Deoban, Kanasar",
        },
        itinerary: [
            { day: 1, title: "Arrival in Chakrata", desc: "Arrival at Dehradun, scenic drive to Chakrata. Evening market exploration." },
            { day: 2, title: "Tiger Falls Trek", desc: "Visit the highest direct waterfall in Uttarakhand. Picnic lunch near falls." },
            { day: 3, title: "Deoban Forest Walk", desc: "Explore dense Deodar forests with panoramic Himalayan views." },
            { day: 4, title: "Departure", desc: "Last minute shopping and drive back to Dehradun." }
        ],
        packages: [
            {
                id: 1,
                name: "Standard Package",
                duration: "4D/3N",
                price: 4999,
                features: ["3-star Hotels", "Breakfast & Dinner", "Sightseeing", "Tour Manager"]
            }
        ],
        inclusions: [
            "3 nights accommodation in standard hotel/resort",
            "3 breakfasts and 3 dinners",
            "Sightseeing as per itinerary",
            "All applicable taxes",
            "Tour manager assistance"
        ],
        exclusions: [
            "Transport to/from Dehradun",
            "Lunches during the tour",
            "Entry fees to monuments",
            "Personal expenses",
            "Travel insurance"
        ],
        faqs: [
            {
                question: "Can we extend our stay in Chakrata?",
                answer: "Yes, absolutely! We can customize the package according to your preferences."
            },
            {
                question: "What is the difficulty level of Tiger Falls trek?",
                answer: "The trek is moderate and suitable for beginners. It takes about 2-3 hours."
            }
        ]
    },
    shimla: {
        id: "shimla",
        name: "Shimla",
        title: "Shimla - The Queen of Hills",
        state: "Himachal Pradesh",
        tagline: "The Queen of Hills",
        description: "Shimla, the capital of Himachal Pradesh, is the most popular hill station in Northern India. Known for its Victorian architecture, the Mall Road, and the historic toy train.",
        altitude: "2,276 meters",
        winterTemp: " -2°C to 8°C",
        images: {
            hero: "https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&q=80&w=1600",
        },
        packageSummary: {
            duration: "4 Days / 3 Nights",
            price: "6,499",
            destinations: "The Ridge, Kufri, Mall Road",
        },
        itinerary: [
            { day: 1, title: "Shimla Arrival", desc: "Pickup from Chandigarh/Shimla. Evening walk at Mall Road & The Ridge." },
            { day: 2, title: "Kufri Adventure", desc: "Visit Kufri, the adventure capital. Enjoy horse riding and snow sports." },
            { day: 3, title: "Temple & Heritage Walk", desc: "Visit Jakhoo Temple and the Viceregal Lodge (Heritage museum)." },
            { day: 4, title: "Departure", desc: "Toy train ride experience and drive back to Chandigarh." }
        ],
        packages: [
            {
                id: 1,
                name: "Heritage Package",
                duration: "4D/3N",
                price: 6499,
                features: ["3-star Hotels", "Breakfast & Dinner", "Toy Train", "Tour Manager"]
            }
        ],
        inclusions: [
            "3 nights accommodation in Shimla",
            "Daily breakfast and dinner",
            "Toy train experience",
            "Sightseeing as per itinerary",
            "All applicable taxes"
        ],
        exclusions: [
            "Transport to/from Chandigarh",
            "Lunches during the tour",
            "Entry fees to monuments",
            "Personal expenses",
            "Adventure activities cost"
        ],
        faqs: [
            {
                question: "Is the toy train ride included?",
                answer: "Yes, the iconic Kalka-Shimla toy train experience is included in the package."
            },
            {
                question: "Best time to visit Shimla?",
                answer: "March to June for pleasant weather, December to February for snowfall."
            }
        ]
    },
    manali: {
        id: "manali",
        name: "Manali",
        title: "Manali - Adventure Hub of Himalayas",
        state: "Himachal Pradesh",
        tagline: "Lovers Paradise - Adventure Hub",
        description: "Nestled in the Beas River Valley, Manali is a gateway to adventure in the Himalayas. From skiing in Solang to trekking the Rohtang Pass, it's a dream for adrenaline junkies.",
        altitude: "2,050 meters",
        winterTemp: "-5°C to 5°C",
        images: {
            hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600",
        },
        packageSummary: {
            duration: "5 Days / 4 Nights",
            price: "8,999",
            destinations: "Solang Valley, Rohtang, Hadimba Temple",
        },
        itinerary: [
            { day: 1, title: "Arrival & Local Sightseeing", desc: "Evening visit to Hadimba Devi Temple and old Manali cafes." },
            { day: 2, title: "Solang Valley & Rohtang", desc: "Full day excursion to Solang Valley and Rohtang Pass (subject to permission)." },
            { day: 3, title: "Kullu & Kasol Trip", desc: "Visit the Manikaran Sahib Gurudwara and Parvati Valley beauty." },
            { day: 4, title: "Adventure Sports", desc: "Enjoy river rafting in Beas River and paragliding in Solang." },
            { day: 5, title: "Departure", desc: "Morning shopping and transfer to Volvo bus station." }
        ],
        packages: [
            {
                id: 1,
                name: "Adventure Package",
                duration: "5D/4N",
                price: 8999,
                features: ["3-star Hotels", "All Meals", "Adventure Activities", "Tour Manager"]
            }
        ],
        inclusions: [
            "4 nights accommodation in Manali",
            "Daily breakfast and dinner",
            "Solang Valley visit with activities",
            "Rohtang Pass excursion (subject to permit)",
            "All transfers and sightseeing"
        ],
        exclusions: [
            "Volvo bus tickets to/from Manali",
            "Lunches during the tour",
            "Rohtang Pass permit charges",
            "Personal expenses",
            "Additional adventure activities"
        ],
        faqs: [
            {
                question: "Is Rohtang Pass visit guaranteed?",
                answer: "Rohtang Pass visit is subject to weather conditions and permit availability."
            },
            {
                question: "Are adventure activities included?",
                answer: "Basic activities in Solang are included. Premium activities can be added at extra cost."
            }
        ]
    },
    ladakh: {
        id: "ladakh",
        name: "Ladakh",
        title: "Ladakh - The Dream Ride to Land of High Passes",
        state: "Ladakh (UT)",
        tagline: "The Dream Ride to Ladakh - Land of High Passes",
        description: "Ladakh, the land of high passes, is a dream destination for every adventure seeker and motorcycle enthusiast. Experience the breathtaking landscapes, pristine lakes, ancient monasteries, and the thrill of riding through the world's highest motorable roads.",
        altitude: "3,524 meters",
        winterTemp: "-20°C to -5°C",
        images: {
            hero: "/ladakh-hero.png",
        },
        packageSummary: {
            duration: "6 Days / 5 Nights",
            price: "14,999",
            destinations: "Leh, Nubra Valley, Pangong Lake, Khardung La",
        },
        itinerary: [
            { day: 1, title: "Arrival in Leh", desc: "Arrive at Leh airport. Complete rest for acclimatization. Evening visit to Leh Market and Shanti Stupa." },
            { day: 2, title: "Leh Local Sightseeing", desc: "Visit Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib, and Sangam Point (confluence of Indus & Zanskar rivers)." },
            { day: 3, title: "Leh to Nubra Valley via Khardung La", desc: "Cross the world's highest motorable road at 18,380 ft. Visit Diskit Monastery and Hunder Sand Dunes. Enjoy camel safari on double-humped Bactrian camels." },
            { day: 4, title: "Nubra to Pangong Lake", desc: "Drive through scenic Shyok route to the mesmerizing Pangong Lake (14,270 ft). Witness the changing colors of the lake. Overnight camping by the lake." },
            { day: 5, title: "Pangong to Leh", desc: "Morning views of Pangong Lake. Drive back to Leh via Changla Pass (17,590 ft). Visit Hemis Monastery and Thiksey Monastery en route." },
            { day: 6, title: "Departure", desc: "Last minute shopping at Leh Market. Transfer to airport with lifetime memories of the Himalayan adventure." }
        ],
        packages: [
            {
                id: 1,
                name: "Ladakh Explorer",
                duration: "6D/5N",
                price: 14999,
                features: ["Comfortable Hotels & Camps", "All Meals", "Khardung La Pass", "Pangong Lake", "Inner Line Permits"]
            }
        ],
        inclusions: [
            "5 nights accommodation (3 nights hotel in Leh, 1 night camp in Nubra, 1 night camp at Pangong)",
            "All meals (breakfast, lunch, dinner)",
            "All transfers and sightseeing by private vehicle",
            "Inner Line Permits for Nubra Valley and Pangong Lake",
            "Oxygen cylinder and first aid kit in vehicle",
            "Experienced driver cum guide"
        ],
        exclusions: [
            "Airfare to/from Leh",
            "Any kind of personal expenses",
            "Entry fees to monasteries and monuments",
            "Camel safari at Nubra Valley",
            "Travel insurance (highly recommended)",
            "Tips to driver and hotel staff"
        ],
        faqs: [
            {
                question: "What is the best time to visit Ladakh?",
                answer: "May to September is the best time. Roads are open and weather is pleasant. June to August is peak season."
            },
            {
                question: "Is acclimatization necessary?",
                answer: "Yes, absolutely! Day 1 is kept for complete rest to help your body adjust to high altitude. Avoid alcohol and heavy physical activity on first day."
            },
            {
                question: "Do I need any permits?",
                answer: "Inner Line Permits for Nubra Valley and Pangong Lake are included in the package. We handle all permit formalities."
            },
            {
                question: "What about altitude sickness?",
                answer: "We provide oxygen cylinders in vehicles. Drink plenty of water, avoid alcohol, and inform immediately if you feel unwell. Diamox tablets are recommended (consult your doctor)."
            }
        ]
    }
};
