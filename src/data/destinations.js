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
        name: "Spiti Valley",
        title: "Spiti Valley Circuit - The Middle Land",
        state: "Himachal Pradesh",
        tagline: "Shimla - Kinnaur - Spiti - Manali",
        description: "An epic 9-day road trip covering the best of Himachal Pradesh. Starting from the colonial charm of Shimla, traversing the rugged Kinnaur Valley, exploring the mystical Spiti Valley, and ending in the adventure hub of Manali.",
        altitude: "4,270 meters",
        winterTemp: "-20°C to 5°C",
        images: {
            hero: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1600",
        },
        packageSummary: {
            duration: "9 Days / 8 Nights",
            price: "21,999",
            destinations: "Shimla, Kinnaur, Tabo, Kaza, Chandratal, Manali",
        },
        itinerary: [
            { day: 1, title: "Delhi - Shimla - Narkanda", desc: "Drive from Delhi to Shimla. Local sightseeing: The Ridge, Mall Road, Jakhu Temple. Drive to Narkanda. Overnight stay." },
            { day: 2, title: "Narkanda - Sangla - Chitkul", desc: "Drive through the beautiful Kinnaur Valley. Visit Chitkul (Last village of India). Overnight stay in Sangla/Chitkul." },
            { day: 3, title: "Sangla - Kalpa", desc: "Visit Kamru Fort. Drive to Kalpa. Enjoy sunset views of Mount Kinner Kailash. Overnight in Kalpa." },
            { day: 4, title: "Kalpa - Nako - Tabo", desc: "Drive via Nako Lake & Geyu Village (Mummy). Enter Spiti Valley. Overnight in Tabo." },
            { day: 5, title: "Tabo - Dhankar - Kaza", desc: "Visit Tabo Monastery, Dhankar Monastery. Proceed to Kaza. Check-in to Hotel/Homestay." },
            { day: 6, title: "Kaza Local Sightseeing", desc: "Visit Hikkim (Highest Post Office), Komik (Highest Village), and Langza (Buddha Statue). Return to Kaza." },
            { day: 7, title: "Kaza - Chandratal", desc: "Drive to Chandratal Lake via Kunzum Pass. Witness the color-changing lake. Overnight camping at Chandratal/Battal." },
            { day: 8, title: "Chandratal - Manali", desc: "Drive to Manali via Atal Tunnel. Evening free for Mall Road exploration. Overnight in Manali." },
            { day: 9, title: "Manali - Delhi", desc: "Morning breakfast. Departure for Delhi. Trip ends with lifetime memories." }
        ],
        packages: [
            {
                id: 1,
                name: "Spiti Circuit Expedition",
                duration: "9D/8N",
                price: 21999,
                features: ["Hotels & Camps", "Breakfast & Dinner", "Tempo Traveller", "Experience Captain"]
            }
        ],
        inclusions: [
            "Transport from Delhi to Delhi (Tempo Traveller/Volvo)",
            "Accommodation on twin/triple sharing basis",
            "Breakfast and Dinner during the trip",
            "Driver charges, toll, parking",
            "Inner Line Permits for Spiti Valley",
            "Oxygen cylinder/First Aid kit"
        ],
        exclusions: [
            "Lunch during the trip",
            "Monastery/Monument entry fees",
            "Any personal expenses",
            "Heater charges",
            "Travel Insurance"
        ],
        faqs: [
            {
                question: "Is this trip suitable for beginners?",
                answer: "This is a high-altitude road trip. Basic fitness is required. Consult doctor if you have breathing issues."
            },
            {
                question: "What is the best time for this circuit?",
                answer: "June to September is the best time when all roads including Kunzum Pass and Chandratal are open."
            }
        ]
    },
    manali: {
        id: "manali",
        name: "Manali",
        title: "Manali - The Valley of Gods",
        state: "Himachal Pradesh",
        tagline: "Snow, Mountains & Hippie Vibes",
        description: "Experience the best of Himachal with a perfect blend of Manali's snow-capped peaks and Kasol's chill vibes. From the spiritual Manikaran to the adventurous Solang Valley, this trip covers it all.",
        altitude: "2,050 meters",
        winterTemp: "-5°C to 5°C",
        images: {
            hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600",
        },
        packageSummary: {
            duration: "5 Days / 4 Nights",
            price: "6,999",
            destinations: "Manali, Solang, Kasol, Manikaran",
        },
        itinerary: [
            { day: 1, title: "Departure from Delhi", desc: "Start journey from Delhi by AC Bus/Tempo Traveller in the evening. Dinner halt at Murthal (Self-paid). Overnight journey to Manali." },
            { day: 2, title: "Manali Arrival & Sightseeing", desc: "Reach Manali & check-in to hotel. Visit Hadimba Temple, Manu Temple, Mall Road, Tibetan Monastery, and Van Vihar. Dinner (Veg) & Overnight stay with Bonfire at hotel." },
            { day: 3, title: "Solang Valley & Rohtang", desc: "After breakfast, visit Solang Valley, Atal Tunnel & Sissu (if weather permits). Enjoy snow activities. Return to hotel for Dinner (Veg) & DJ Night Party." },
            { day: 4, title: "Manali to Kasol", desc: "Morning breakfast & checkout at 11 AM. Drive to Kasol. Check-in to riverside camps. Enjoy mesmerizing mountain views, Bonfire & DJ Night. Dinner (Veg) at camp." },
            { day: 5, title: "Manikaran & Departure", desc: "Visit Manikaran Sahib Gurudwara and hot springs. Local sightseeing in Kasol. Evening departure for Delhi. Overnight journey." }
        ],
        packages: [
            {
                id: 1,
                name: "Manali Kasol Special",
                duration: "5D/4N",
                price: 6999,
                features: ["Volvo/Tempo Traveller", "Hotels & Camps", "Breakfast & Dinner", "DJ Night & Bonfire"]
            }
        ],
        inclusions: [
            "Delhi - Manali - Delhi transportation by AC Volvo/Tempo Traveller",
            "2 Nights stay in Manali Hotel",
            "1 Night stay in Kasol Camp",
            "3 Breakfasts & 3 Dinners (Veg)",
            "Sightseeing as per itinerary",
            "Bonfire & Music"
        ],
        exclusions: [
            "Lunch during the tour",
            "Any entry fees/monument charges",
            "Adventure activities (Paragliding, Skiing, etc.)",
            "Heater charges in hotel",
            "Personal expenses"
        ],
        faqs: [
            {
                question: "Is Rohtang Pass included?",
                answer: "Rohtang Pass visit depends on permit availability and weather conditions. Extra charges may apply for the permit."
            },
            {
                question: "What kind of vehicle is used?",
                answer: "For Delhi transfers, we use AC Volvo or Tempo Traveller depending on group size. Local sightseeing is via private/shared cab."
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
                answer: "Inner Line Permits for Nubra Valley and Pangong Lake are included. We handle all permit formalities."
            },
            {
                question: "What about altitude sickness?",
                answer: "We provide oxygen cylinders in vehicles. Drink plenty of water, avoid alcohol, and inform immediately if you feel unwell. Diamox tablets are recommended (consult your doctor)."
            }
        ]
    },
    kashmir: {
        id: "kashmir",
        name: "Kashmir",
        title: "Kashmir - The Paradise on Earth",
        state: "Jammu & Kashmir",
        tagline: "Paradise on Earth",
        description: "Experience the mesmerizing beauty of Kashmir with Safar Chaska. From the Dal Lake in Srinagar to the snow-capped peaks of Gulmarg and the lush valleys of Pahalgam, this journey is a glimpse of heaven.",
        altitude: "1,585 meters",
        winterTemp: "-2°C to 10°C",
        images: {
            hero: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1600",
        },
        packageSummary: {
            duration: "8 Days / 7 Nights",
            price: "18,999",
            destinations: "Srinagar, Gulmarg, Sonmarg, Pahalgam, Jammu",
        },
        itinerary: [
            { day: 1, title: "Rajasthan to Jammu", desc: "Depart from Rajasthan at night. Start of an exciting overnight journey towards the mountains." },
            { day: 2, title: "Jammu to Srinagar", desc: "Arrive in Jammu & proceed to Srinagar (approx 6 hours). Check-in at Hotel. Day free for rest and acclimatization." },
            { day: 3, title: "Sonmarg Day Trip", desc: "After breakfast, full-day excursion to Sonmarg (Meadow of Gold, 2690 Mtrs). Visit the Thajiwas Glacier where snow remains round the year. Return to Srinagar Hotel." },
            { day: 4, title: "Gulmarg Day Trip", desc: "Full day excursion to Gulmarg (Meadow of Flowers, 8700 ft). Enjoy the famous Gondola Ride (Asia's highest & longest cable car) to Kungdoor Station. Return to Srinagar." },
            { day: 5, title: "Houseboat Stay", desc: "Check out from hotel & proceed for sightseeing. Local Srinagar tour of Mughal Gardens (Nishat, Shalimar), Cheshmashahi, Shankaracharya Temple. Check-in at Houseboat. Enjoy Shikara ride in the evening. Dinner & Overnight at Houseboat." },
            { day: 6, title: "Srinagar to Pahalgam", desc: "Proceed to Pahalgam (Valley of Shepherds). Visit Avantipura ruins, Saffron fields. Explore trekking options like Lidderwat, Kolahoi Glacier. Dinner & Overnight stay at hotel in Pahalgam." },
            { day: 7, title: "Pahalgam to Jammu-Rajasthan", desc: "After breakfast, check out from the hotel and proceed to Jammu railway station for the return journey to Rajasthan with lots of memories." },
            { day: 8, title: "Reach Back Rajasthan", desc: "Reach back to Rajasthan with a bag full of beautiful memories." }
        ],
        packages: [
            {
                id: 1,
                name: "Heavenly Kashmir",
                duration: "8D/7N",
                price: 18999,
                features: ["3-star Hotels & Houseboat", "Breakfast & Dinner", "Shikara Ride", "DJ Night", "Lunch & Dinner Included"]
            }
        ],
        inclusions: [
            "Accommodation in comfortable Hotels/Houseboat",
            "Daily Breakfast, Lunch & Dinner as per plan",
            "All transfers and sightseeing by private vehicle",
            "Shikara Ride on Dal Lake",
            "DJ Night (Group Entertainment)",
            "Toll taxes, parking and driver allowances"
        ],
        exclusions: [
            "Train/Air fare to/from Rajasthan",
            "Gondola Ride tickets at Gulmarg",
            "Pony rides/Sledging",
            "Entry fees to monuments and gardens",
            "Personal expenses like laundry, tips",
            "Any other item not mentioned in inclusions"
        ],
        faqs: [
            {
                question: "Is it safe to visit Kashmir?",
                answer: "Yes, absolutely! Kashmir is one of the most hospitable places and is safe for tourists."
            },
            {
                question: "What clothes should we carry?",
                answer: "Carry heavy woolens for winter (Oct-Mar) and light woolens for summer evenings. Comfortable walking shoes are a must."
            }
        ]
    },
    sikkim: {
        id: "sikkim",
        name: "Sikkim & Darjeeling",
        title: "Sikkim - Darjeeling Educational Tour",
        state: "Sikkim & West Bengal",
        tagline: "Nature: Educational Tour",
        description: "A comprehensive 13-day journey including Train travel, covering the best of North East India. From the capital Gangtok to the snowy heights of Zero Point and the tea gardens of Darjeeling.",
        altitude: "1,650 - 4,600 meters",
        winterTemp: "-5°C to 15°C",
        images: {
            hero: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1600",
        },
        packageSummary: {
            duration: "13 Days / 12 Nights",
            price: "24,999",
            destinations: "Gangtok, Lachung, Yumthang, Pelling, Darjeeling",
        },
        itinerary: [
            { day: 1, title: "Departure from Balotra", desc: "Departure from Balotra by train. Meals provided. Overnight journey." },
            { day: 2, title: "Train Journey", desc: "Train journey continues. All meals provided in train." },
            { day: 3, title: "Arrival at NJP / Bagdogra", desc: "Arrival at NJP. Transfer to Gangtok. Hotel check-in & rest." },
            { day: 4, title: "Tsomgo Lake & Nathula", desc: "Excursion to Tsomgo Lake, Baba Mandir & Nathula Pass." },
            { day: 5, title: "Gangtok to Lachung", desc: "Travel Gangtok to Lachung. Scenic mountain drive." },
            { day: 6, title: "Yumthang Valley & Zero Point", desc: "Visit Yumthang Valley & Zero Point. Return to Lachung." },
            { day: 7, title: "Lachung to Gangtok", desc: "Return from Lachung to Gangtok. Rest evening." },
            { day: 8, title: "Gangtok to Pelling", desc: "Travel Gangtok to Pelling via Namchi (Chardham)." },
            { day: 9, title: "Pelling Sightseeing", desc: "Pelling local sightseeing including Sky Walk. Overnight stay." },
            { day: 10, title: "Pelling to Darjeeling", desc: "Transfer to Darjeeling. Evening free for Mall Road." },
            { day: 11, title: "Darjeeling Sightseeing", desc: "Early morning Tiger Hill sunrise. Batasia Loop, Ghoom Monastery. Zoo & HMI." },
            { day: 12, title: "Departure", desc: "Transfer to NJP Railway Station. Train journey starts." },
            { day: 13, title: "Reach Home", desc: "Arrival at Balotra with sweet memories." }
        ],
        packages: [
            {
                id: 1,
                name: "Sikkim Educational",
                duration: "13D/12N",
                price: 24999,
                features: ["Train Journey", "All Meals (Train)", "3-Star Hotels", "Educational"]
            }
        ],
        inclusions: [
            "Train tickets (Sleeper Class)",
            "Accommodation on triple sharing basis",
            "All Meals (Breakfast, Lunch, Dinner)",
            "All transfers and sightseeing by private vehicle",
            "Nathula Pass Permit",
            "Tour Manager assistance"
        ],
        exclusions: [
            "Any personal expenses",
            "Entry fees to monuments/parks",
            "Extra meals or drinks",
            "Gondola/Ropeway charges",
            "Anything not mentioned in inclusions"
        ],
        faqs: [
            {
                question: "Is food included in train?",
                answer: "Yes, all meals are provided during the train journey."
            },
            {
                question: "Is this suitable for students?",
                answer: "Yes, this is specially designed as an educational tour with safe and comfortable arrangements."
            }
        ]
    }
};
