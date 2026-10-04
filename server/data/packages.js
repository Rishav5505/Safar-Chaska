// Catalogue used by seedPackages.js. Images starting with "/" are served by the frontend's public/ folder.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1200`;

const STD_EXCLUSIONS = ['Travel to the starting point', 'Personal expenses & tips', 'Anything not mentioned in inclusions', '5% GST'];

module.exports = [
    {
        title: 'Chakrata Waterfall & Moila Top Escape',
        description: 'Our signature trip to the quiet cantonment town of Chakrata — deodar forests, the 312 ft Tiger Falls, the meadows of Moila Top and campfire nights far from tourist crowds.',
        location: 'Chakrata, Uttarakhand',
        price: 6999, originalPrice: 8499,
        duration: '4D/3N', category: 'Adventure', tag: 'Bestseller', isFeatured: true,
        rating: 4.9, reviewCount: 412, difficulty: 'Easy',
        bestSeason: 'Mar – Jun, Sep – Dec', groupSize: '8 – 20', altitude: '2,118 m',
        image: '/chakrata-group.webp',
        images: ['/chakrata-group.webp', u('photo-1506905925346-21bda4d32df4'), u('photo-1504280390367-361c6d9f38f4')],
        highlights: ['Tiger Falls — one of the tallest direct waterfalls in Uttarakhand', 'Sunrise meadow walk to Moila Top', 'Bonfire & live music under the stars', 'Deoban forest trail with Himalayan views'],
        itinerary: [
            { day: 1, title: 'Dehradun → Chakrata', activity: 'Pickup from Dehradun, scenic drive via Kalsi. Check in to the cottage, evening bonfire and introductions.' },
            { day: 2, title: 'Tiger Falls & Chilmiri Neck', activity: 'Short descent to Tiger Falls for a swim and picnic lunch. Sunset at Chilmiri Neck.' },
            { day: 3, title: 'Moila Top Meadow Trek', activity: 'Early start for the Moila Top trek through oak and deodar. Packed lunch on the meadow, evening free.' },
            { day: 4, title: 'Deoban & Departure', activity: 'Morning walk in Deoban forest, then drive back to Dehradun by evening.' }
        ],
        inclusions: ['3 nights cottage / camp stay', 'All meals from Day 1 dinner to Day 4 breakfast', 'Tempo traveller from Dehradun', 'Trek leader & local guide', 'Bonfire night'],
        exclusions: STD_EXCLUSIONS
    },
    {
        title: 'Kedarnath Yatra',
        description: 'A guided pilgrimage to the sacred Kedarnath Jyotirlinga with comfortable stays, help with registration and darshan, and an experienced captain for the 16 km trek.',
        location: 'Rudraprayag, Uttarakhand',
        price: 12499, originalPrice: 14999,
        duration: '5D/4N', category: 'Spiritual', tag: 'Seasonal', isFeatured: true,
        rating: 4.9, reviewCount: 368, difficulty: 'Moderate',
        bestSeason: 'May – Jun, Sep – Oct', groupSize: '10 – 25', altitude: '3,583 m',
        image: '/kedarnath-hero.webp',
        images: ['/kedarnath-hero.webp', '/kedarnath.webp'],
        highlights: ['Darshan at Kedarnath Jyotirlinga', 'Evening aarti at Rishikesh & Rudraprayag sangam', 'Guided 16 km trek from Gaurikund', 'Optional pony / helicopter assistance'],
        itinerary: [
            { day: 1, title: 'Haridwar → Guptkashi', activity: 'Drive along the Alaknanda via Devprayag and Rudraprayag. Overnight at Guptkashi.' },
            { day: 2, title: 'Trek to Kedarnath', activity: 'Drive to Sonprayag, shared jeep to Gaurikund and trek 16 km to Kedarnath. Evening aarti.' },
            { day: 3, title: 'Darshan & Descent', activity: 'Early morning darshan, visit Bhairavnath temple, trek back to Gaurikund and drive to Guptkashi.' },
            { day: 4, title: 'Guptkashi → Rishikesh', activity: 'Drive to Rishikesh, Ganga aarti at Triveni Ghat.' },
            { day: 5, title: 'Departure', activity: 'Breakfast and drop at Haridwar station.' }
        ],
        inclusions: ['4 nights hotel stay (twin sharing)', 'Breakfast & dinner', 'All transfers in Tempo Traveller', 'Yatra registration support', 'Trip captain throughout'],
        exclusions: ['Pony / palki / helicopter charges', ...STD_EXCLUSIONS]
    },
    {
        title: 'Leh Ladakh Bike Expedition',
        description: 'Ride Royal Enfields over the highest motorable passes on Earth — Khardung La, Chang La — to Nubra’s sand dunes and the impossible blues of Pangong Lake.',
        location: 'Leh, Ladakh',
        price: 27999, originalPrice: 32999,
        duration: '8D/7N', category: 'Adventure', tag: 'Must Visit', isFeatured: true,
        rating: 5.0, reviewCount: 287, difficulty: 'Challenging',
        bestSeason: 'Jun – Sep', groupSize: '10 – 18', altitude: '5,359 m',
        image: '/ladakh-hero.webp',
        images: ['/ladakh-hero.webp', '/ladakh.webp', u('photo-1581793745862-99fde7fa73d2')],
        highlights: ['Royal Enfield Himalayan 411cc with fuel', 'Khardung La & Chang La passes', 'Camp night by Pangong Lake', 'Double-hump camel ride at Hunder'],
        itinerary: [
            { day: 1, title: 'Arrive in Leh', activity: 'Airport pickup, full rest day to acclimatise. Evening stroll at Leh market.' },
            { day: 2, title: 'Leh Local', activity: 'Bike allotment, Shanti Stupa, Hall of Fame, Magnetic Hill and Sangam.' },
            { day: 3, title: 'Leh → Nubra via Khardung La', activity: 'Ride over Khardung La to Nubra. Sand dunes and camel safari at Hunder.' },
            { day: 4, title: 'Nubra → Pangong', activity: 'Ride via Shyok river route to Pangong Lake. Overnight in lakeside camps.' },
            { day: 5, title: 'Pangong → Leh via Chang La', activity: 'Sunrise at the lake, ride back to Leh over Chang La.' },
            { day: 6, title: 'Leh → Tso Moriri (optional) / Leisure', activity: 'Monasteries of Thiksey and Hemis, or a day trip to Tso Moriri for riders.' },
            { day: 7, title: 'Leh Leisure', activity: 'Buffer day for weather, shopping and farewell dinner.' },
            { day: 8, title: 'Departure', activity: 'Airport drop.' }
        ],
        inclusions: ['7 nights hotel & camp stay', 'Breakfast & dinner', 'Royal Enfield with fuel & mechanic', 'Backup vehicle & oxygen cylinder', 'Inner line permits'],
        exclusions: ['Flights to Leh', 'Bike damage charges', ...STD_EXCLUSIONS]
    },
    {
        title: 'Kashmir Paradise',
        description: 'Houseboat nights on Dal Lake, shikara rides at sunrise, the meadows of Gulmarg and Pahalgam — Kashmir at an unhurried, honeymoon-friendly pace.',
        location: 'Srinagar, Jammu & Kashmir',
        price: 18999, originalPrice: 22999,
        duration: '6D/5N', category: 'Honeymoon', tag: 'Couples’ Favourite', isFeatured: true,
        rating: 4.9, reviewCount: 341, difficulty: 'Easy',
        bestSeason: 'Mar – Jun, Dec – Feb', groupSize: 'Private / 2+', altitude: '1,585 m',
        image: '/kashmir.webp',
        images: ['/kashmir.webp', u('photo-1598091383021-15ddea10925d')],
        highlights: ['Night in a deluxe Dal Lake houseboat', 'Gulmarg Gondola phase 1', 'Betaab & Aru valleys in Pahalgam', 'Candle-light dinner for couples'],
        itinerary: [
            { day: 1, title: 'Arrive Srinagar', activity: 'Airport pickup, check in to houseboat, sunset shikara ride on Dal Lake.' },
            { day: 2, title: 'Srinagar Gardens', activity: 'Mughal gardens — Nishat, Shalimar, Chashme Shahi — and old city walk.' },
            { day: 3, title: 'Gulmarg', activity: 'Day trip to Gulmarg, Gondola ride and snow activities in season.' },
            { day: 4, title: 'Pahalgam', activity: 'Drive to Pahalgam via saffron fields. Evening by the Lidder river.' },
            { day: 5, title: 'Betaab & Aru Valley', activity: 'Explore Betaab, Aru and Chandanwari valleys.' },
            { day: 6, title: 'Departure', activity: 'Drive back to Srinagar airport.' }
        ],
        inclusions: ['1 night houseboat + 4 nights hotel', 'Breakfast & dinner', 'Private cab for all sightseeing', 'Shikara ride', 'Honeymoon cake & decor on request'],
        exclusions: ['Flights', 'Gondola tickets', 'Pony rides', ...STD_EXCLUSIONS]
    },
    {
        title: 'Spiti Valley Circuit',
        description: 'A full loop through the cold desert — Kinnaur’s apple orchards, Key Monastery, the world’s highest post office at Hikkim and starry nights at Chandratal.',
        location: 'Spiti, Himachal Pradesh',
        price: 21999, originalPrice: 25999,
        duration: '9D/8N', category: 'Adventure', tag: 'Trending', isFeatured: true,
        rating: 4.9, reviewCount: 198, difficulty: 'Moderate',
        bestSeason: 'Jun – Oct', groupSize: '8 – 14', altitude: '4,550 m',
        image: u('photo-1626621341517-bbf3d9990a23'),
        images: [u('photo-1626621341517-bbf3d9990a23'), u('photo-1504280390367-361c6d9f38f4')],
        highlights: ['Key Monastery & Kibber village', 'Postcard from Hikkim — world’s highest post office', 'Camping at Chandratal lake', 'Kinnaur Kailash views at Kalpa'],
        itinerary: [
            { day: 1, title: 'Delhi → Shimla', activity: 'Overnight Volvo / drive to Shimla.' },
            { day: 2, title: 'Shimla → Kalpa', activity: 'Drive along the Sutlej to Kalpa. Sunset over Kinnaur Kailash.' },
            { day: 3, title: 'Kalpa → Nako', activity: 'Visit Khab sangam and Nako lake.' },
            { day: 4, title: 'Nako → Kaza', activity: 'Tabo monastery and Dhankar en route to Kaza.' },
            { day: 5, title: 'Kaza Villages', activity: 'Key, Kibber, Langza, Hikkim and Komic.' },
            { day: 6, title: 'Kaza → Chandratal', activity: 'Cross Kunzum La to Chandratal. Lakeside camps.' },
            { day: 7, title: 'Chandratal → Manali', activity: 'Drive over Atal Tunnel to Manali.' },
            { day: 8, title: 'Manali', activity: 'Leisure day — Old Manali cafés, Hadimba temple.' },
            { day: 9, title: 'Manali → Delhi', activity: 'Overnight journey back to Delhi.' }
        ],
        inclusions: ['8 nights hotels, homestays & camps', 'Breakfast & dinner', 'SUV / Tempo Traveller with experienced mountain driver', 'Permits', 'Trip captain'],
        exclusions: ['Delhi–Shimla & Manali–Delhi bus', ...STD_EXCLUSIONS]
    },
    {
        title: 'Manali Snow Escape',
        description: 'Snow at Solang and Atal Tunnel, riverside cafés in Old Manali and a day in Kasol — the classic Himachal getaway done right.',
        location: 'Manali, Himachal Pradesh',
        price: 8999, originalPrice: 10999,
        duration: '5D/4N', category: 'Honeymoon', tag: 'Premium', isFeatured: true,
        rating: 4.8, reviewCount: 455, difficulty: 'Easy',
        bestSeason: 'Oct – Mar for snow, Apr – Jun for weather', groupSize: '2 – 20', altitude: '2,050 m',
        image: u('photo-1605649487212-47bdab064df7'),
        images: [u('photo-1605649487212-47bdab064df7'), u('photo-1551524559-8af4e6624178')],
        highlights: ['Solang Valley snow activities', 'Atal Tunnel & Sissu', 'Old Manali café crawl', 'Kasol & Manikaran Sahib'],
        itinerary: [
            { day: 1, title: 'Delhi → Manali', activity: 'Overnight Volvo from Delhi.' },
            { day: 2, title: 'Arrive Manali', activity: 'Check in, Hadimba temple, Vashisht hot springs, Mall Road.' },
            { day: 3, title: 'Solang & Atal Tunnel', activity: 'Snow point, Atal Tunnel and Sissu waterfall.' },
            { day: 4, title: 'Kasol Day Trip', activity: 'Parvati valley, Kasol riverside and Manikaran.' },
            { day: 5, title: 'Departure', activity: 'Morning at leisure, evening Volvo back to Delhi.' }
        ],
        inclusions: ['3 nights hotel', 'Breakfast & dinner', 'Volvo Delhi–Manali–Delhi', 'Private cab sightseeing'],
        exclusions: ['Snow gear & adventure activities', 'Rohtang permit', ...STD_EXCLUSIONS]
    },
    {
        title: 'Rishikesh Rafting & Yoga Retreat',
        description: 'Mornings of yoga by the Ganga, afternoons of 16 km white-water rafting and riverside camping — the perfect long weekend reset.',
        location: 'Rishikesh, Uttarakhand',
        price: 4499, originalPrice: 5499,
        duration: '3D/2N', category: 'Wellness', tag: 'Weekend Pick', isFeatured: false,
        rating: 4.8, reviewCount: 523, difficulty: 'Easy',
        bestSeason: 'Sep – Jun', groupSize: '2 – 30', altitude: '372 m',
        image: u('photo-1506744038136-46273834b3fb'),
        images: [u('photo-1506744038136-46273834b3fb')],
        highlights: ['16 km Shivpuri rafting', 'Sunrise yoga & meditation', 'Ganga aarti at Triveni Ghat', 'Beach camping with bonfire'],
        itinerary: [
            { day: 1, title: 'Arrive & Camp', activity: 'Check in to riverside camps, beach volleyball, bonfire.' },
            { day: 2, title: 'Yoga & Rafting', activity: 'Sunrise yoga, then 16 km rafting with cliff jump. Evening Ganga aarti.' },
            { day: 3, title: 'Café Trail & Departure', activity: 'Laxman Jhula, Beatles Ashram and café hopping.' }
        ],
        inclusions: ['2 nights Swiss tent stay', 'All meals', 'Rafting with certified guide', 'Yoga session'],
        exclusions: STD_EXCLUSIONS
    },
    {
        title: 'Rajasthan Royal Heritage',
        description: 'Palaces, forts and desert dunes — Jaipur, Jodhpur, Jaisalmer and Udaipur with heritage stays and a night under the stars in the Thar.',
        location: 'Rajasthan',
        price: 19999, originalPrice: 23999,
        duration: '7D/6N', category: 'Culture', tag: 'Heritage', isFeatured: true,
        rating: 4.9, reviewCount: 233, difficulty: 'Easy',
        bestSeason: 'Oct – Mar', groupSize: 'Private / 2+', altitude: '—',
        image: '/rajasthan-fort.webp',
        images: ['/rajasthan-fort.webp', '/hawa-mahal.webp'],
        highlights: ['Amber Fort & Hawa Mahal', 'Mehrangarh Fort, Jodhpur', 'Desert camp & camel safari at Sam dunes', 'Sunset boat ride on Lake Pichola'],
        itinerary: [
            { day: 1, title: 'Arrive Jaipur', activity: 'Check in to heritage hotel, evening at Chokhi Dhani.' },
            { day: 2, title: 'Jaipur', activity: 'Amber Fort, Hawa Mahal, City Palace and Jantar Mantar.' },
            { day: 3, title: 'Jaipur → Jodhpur', activity: 'Drive to the Blue City, evening at Clock Tower market.' },
            { day: 4, title: 'Jodhpur → Jaisalmer', activity: 'Mehrangarh Fort, then drive to Jaisalmer.' },
            { day: 5, title: 'Jaisalmer & Desert Camp', activity: 'Golden Fort, Patwon ki Haveli, sunset camel safari and folk night at Sam dunes.' },
            { day: 6, title: 'Jaisalmer → Udaipur', activity: 'Long scenic drive to the City of Lakes.' },
            { day: 7, title: 'Udaipur & Departure', activity: 'City Palace, Lake Pichola boat ride, drop at airport.' }
        ],
        inclusions: ['6 nights heritage hotels & desert camp', 'Breakfast & dinner', 'Private AC car with driver', 'Camel safari & cultural evening'],
        exclusions: ['Monument entry fees', ...STD_EXCLUSIONS]
    },
    {
        title: 'Jaipur Pink City Weekend',
        description: 'A short, stylish weekend in Jaipur — forts at golden hour, rooftop dinners and the best of Johari and Bapu bazaars.',
        location: 'Jaipur, Rajasthan',
        price: 7499, originalPrice: 8999,
        duration: '3D/2N', category: 'Culture', tag: 'Weekend Pick', isFeatured: false,
        rating: 4.7, reviewCount: 176, difficulty: 'Easy',
        bestSeason: 'Oct – Mar', groupSize: '2 – 15', altitude: '—',
        image: '/hawa-mahal.webp',
        images: ['/hawa-mahal.webp'],
        highlights: ['Nahargarh sunset', 'Amber Fort light & sound show', 'Rooftop dinner facing Hawa Mahal', 'Block-printing workshop'],
        itinerary: [
            { day: 1, title: 'Arrive Jaipur', activity: 'Check in, Nahargarh Fort sunset, rooftop dinner.' },
            { day: 2, title: 'Forts & Bazaars', activity: 'Amber Fort, Panna Meena ka Kund, Hawa Mahal, shopping at Johari Bazaar.' },
            { day: 3, title: 'Departure', activity: 'Block-printing workshop at Sanganer and drop.' }
        ],
        inclusions: ['2 nights boutique hotel', 'Breakfast', 'Private cab', 'Workshop session'],
        exclusions: ['Monument entry fees', ...STD_EXCLUSIONS]
    },
    {
        title: 'Sikkim & Darjeeling Explorer',
        description: 'Tea gardens of Darjeeling, monasteries of Gangtok and the frozen Tsomgo Lake — the Eastern Himalayas with Kanchenjunga watching over you.',
        location: 'Sikkim & West Bengal',
        price: 24999, originalPrice: 28999,
        duration: '7D/6N', category: 'Culture', tag: 'Hidden Gem', isFeatured: false,
        rating: 5.0, reviewCount: 142, difficulty: 'Easy',
        bestSeason: 'Mar – May, Oct – Dec', groupSize: '2 – 16', altitude: '4,310 m',
        image: u('photo-1464822759023-fed622ff2c3b'),
        images: [u('photo-1464822759023-fed622ff2c3b')],
        highlights: ['Tiger Hill sunrise over Kanchenjunga', 'Toy train joyride (UNESCO heritage)', 'Tsomgo Lake & Baba Mandir', 'Rumtek monastery'],
        itinerary: [
            { day: 1, title: 'Bagdogra → Darjeeling', activity: 'Pickup and drive through tea gardens to Darjeeling.' },
            { day: 2, title: 'Darjeeling', activity: 'Tiger Hill sunrise, Batasia Loop, toy train and tea estate visit.' },
            { day: 3, title: 'Darjeeling → Gangtok', activity: 'Drive along the Teesta to Gangtok. MG Marg in the evening.' },
            { day: 4, title: 'Tsomgo Lake', activity: 'Excursion to Tsomgo Lake and Baba Mandir (Nathula subject to permit).' },
            { day: 5, title: 'Gangtok Sightseeing', activity: 'Rumtek monastery, Enchey monastery, Banjhakri falls.' },
            { day: 6, title: 'Pelling', activity: 'Drive to Pelling, skywalk and Pemayangtse monastery.' },
            { day: 7, title: 'Departure', activity: 'Drive to Bagdogra / NJP.' }
        ],
        inclusions: ['6 nights hotels', 'Breakfast & dinner', 'Private cab', 'Permits for Tsomgo'],
        exclusions: ['Flights', 'Nathula permit', ...STD_EXCLUSIONS]
    },
    {
        title: 'Kerala Backwaters Honeymoon',
        description: 'Misty tea hills of Munnar, wildlife at Thekkady and a private houseboat night drifting through Alleppey’s backwaters.',
        location: 'Kerala',
        price: 22999, originalPrice: 26999,
        duration: '6D/5N', category: 'Honeymoon', tag: 'Romantic', isFeatured: true,
        rating: 4.9, reviewCount: 264, difficulty: 'Easy',
        bestSeason: 'Sep – Mar', groupSize: 'Private / 2', altitude: '—',
        image: u('photo-1602216056096-3b40cc0c9944'),
        images: [u('photo-1602216056096-3b40cc0c9944')],
        highlights: ['Private houseboat in Alleppey', 'Munnar tea estates', 'Periyar boat safari', 'Ayurvedic couple spa'],
        itinerary: [
            { day: 1, title: 'Kochi → Munnar', activity: 'Drive via Cheeyappara waterfalls to Munnar.' },
            { day: 2, title: 'Munnar', activity: 'Eravikulam park, tea museum, Mattupetty dam.' },
            { day: 3, title: 'Munnar → Thekkady', activity: 'Spice plantation walk, Kathakali show.' },
            { day: 4, title: 'Thekkady → Alleppey', activity: 'Board your private houseboat, cruise the backwaters.' },
            { day: 5, title: 'Alleppey → Kochi', activity: 'Fort Kochi walk, Chinese fishing nets at sunset.' },
            { day: 6, title: 'Departure', activity: 'Drop at Kochi airport.' }
        ],
        inclusions: ['4 nights hotel + 1 night houseboat', 'Breakfast, plus all meals on houseboat', 'Private AC car', 'Flower bed & cake'],
        exclusions: ['Flights', 'Spa treatments', ...STD_EXCLUSIONS]
    },
    {
        title: 'Goa Beach Getaway',
        description: 'North Goa’s beach shacks and nightlife, South Goa’s quiet sands, a sunset cruise on the Mandovi and the Latin Quarter of Fontainhas.',
        location: 'Goa',
        price: 11999, originalPrice: 13999,
        duration: '4D/3N', category: 'Beach', tag: 'Party Pick', isFeatured: false,
        rating: 4.7, reviewCount: 389, difficulty: 'Easy',
        bestSeason: 'Nov – Feb', groupSize: '2 – 20', altitude: '—',
        image: u('photo-1512343879784-a960bf40e7f2'),
        images: [u('photo-1512343879784-a960bf40e7f2')],
        highlights: ['Sunset Mandovi river cruise', 'Water sports at Calangute', 'Fontainhas heritage walk', 'Palolem & Cabo de Rama'],
        itinerary: [
            { day: 1, title: 'Arrive Goa', activity: 'Check in to beach resort, evening at Baga.' },
            { day: 2, title: 'North Goa', activity: 'Fort Aguada, Calangute water sports, Anjuna flea market, sunset cruise.' },
            { day: 3, title: 'South Goa', activity: 'Old Goa churches, Fontainhas, Palolem beach.' },
            { day: 4, title: 'Departure', activity: 'Breakfast and drop.' }
        ],
        inclusions: ['3 nights beach resort', 'Breakfast', 'Airport transfers & sightseeing cab', 'Sunset cruise'],
        exclusions: ['Flights', 'Water sports', ...STD_EXCLUSIONS]
    },
    {
        title: 'Kedarkantha Winter Trek',
        description: 'The most loved snow trek in India — frozen Juda ka Talab, campsites in pine forests and a 360° summit view of Swargarohini and Bandarpoonch.',
        location: 'Sankri, Uttarakhand',
        price: 9999, originalPrice: 11999,
        duration: '6D/5N', category: 'Adventure', tag: 'Snow Trek', isFeatured: true,
        rating: 4.9, reviewCount: 307, difficulty: 'Moderate',
        bestSeason: 'Dec – Apr', groupSize: '10 – 20', altitude: '3,800 m',
        image: u('photo-1551524559-8af4e6624178'),
        images: [u('photo-1551524559-8af4e6624178'), u('photo-1504280390367-361c6d9f38f4')],
        highlights: ['Summit at 12,500 ft in snow', 'Frozen Juda ka Talab', 'Campfire at Kedarkantha base', 'Certified trek leaders & micro-spikes'],
        itinerary: [
            { day: 1, title: 'Dehradun → Sankri', activity: '10-hour scenic drive to Sankri village.' },
            { day: 2, title: 'Sankri → Juda ka Talab', activity: '4 km trek through pine and oak to the frozen lake.' },
            { day: 3, title: 'Juda ka Talab → Base Camp', activity: 'Short climb to Kedarkantha base camp.' },
            { day: 4, title: 'Summit Day', activity: 'Pre-dawn push to the summit, descend to Hargaon.' },
            { day: 5, title: 'Hargaon → Sankri', activity: 'Descend to Sankri, celebration dinner.' },
            { day: 6, title: 'Sankri → Dehradun', activity: 'Drive back to Dehradun.' }
        ],
        inclusions: ['Homestay & tents (triple sharing)', 'All veg meals on trek', 'Dehradun–Sankri transport', 'Trek leader, guides & porters for common gear', 'Forest permits'],
        exclusions: ['Personal porter', ...STD_EXCLUSIONS]
    },
    {
        title: 'Valley of Flowers & Hemkund Sahib',
        description: 'A UNESCO World Heritage valley carpeted with hundreds of alpine flowers, and the glacial lake of Hemkund Sahib — a monsoon trek like no other.',
        location: 'Chamoli, Uttarakhand',
        price: 12999, originalPrice: 14999,
        duration: '6D/5N', category: 'Adventure', tag: 'UNESCO Site', isFeatured: false,
        rating: 4.8, reviewCount: 156, difficulty: 'Moderate',
        bestSeason: 'Jul – Sep', groupSize: '10 – 20', altitude: '4,329 m',
        image: u('photo-1506905925346-21bda4d32df4'),
        images: [u('photo-1506905925346-21bda4d32df4')],
        highlights: ['300+ species of alpine flowers', 'Hemkund Sahib glacial lake', 'Mana — the last Indian village', 'Badrinath darshan (optional)'],
        itinerary: [
            { day: 1, title: 'Rishikesh → Joshimath', activity: 'Drive past the five prayags to Joshimath.' },
            { day: 2, title: 'Govindghat → Ghangaria', activity: 'Drive to Govindghat, trek 10 km to Ghangaria.' },
            { day: 3, title: 'Valley of Flowers', activity: 'Full day exploring the valley.' },
            { day: 4, title: 'Hemkund Sahib', activity: 'Steep climb to Hemkund lake and gurudwara.' },
            { day: 5, title: 'Ghangaria → Joshimath', activity: 'Trek down, visit Mana village & Badrinath.' },
            { day: 6, title: 'Joshimath → Rishikesh', activity: 'Drive back to Rishikesh.' }
        ],
        inclusions: ['5 nights hotels / guesthouses', 'Breakfast & dinner', 'Transport from Rishikesh', 'Trek leader', 'Valley entry permits'],
        exclusions: ['Pony / porter', ...STD_EXCLUSIONS]
    },
    {
        title: 'Varanasi Spiritual Ghats',
        description: 'Dawn boat rides past 84 ghats, the electric Ganga aarti at Dashashwamedh, silk weavers’ lanes and a day at Sarnath where the Buddha first taught.',
        location: 'Varanasi, Uttar Pradesh',
        price: 8999, originalPrice: 10499,
        duration: '3D/2N', category: 'Spiritual', tag: 'Soulful', isFeatured: false,
        rating: 4.8, reviewCount: 201, difficulty: 'Easy',
        bestSeason: 'Oct – Mar', groupSize: '2 – 15', altitude: '—',
        image: u('photo-1561361513-2d000a50f0dc'),
        images: [u('photo-1561361513-2d000a50f0dc')],
        highlights: ['Sunrise boat ride on the Ganga', 'Ganga aarti from a private boat', 'Kashi Vishwanath corridor', 'Sarnath Buddhist circuit'],
        itinerary: [
            { day: 1, title: 'Arrive Varanasi', activity: 'Check in, evening Ganga aarti from a boat.' },
            { day: 2, title: 'Ghats & Temples', activity: 'Sunrise boat ride, Kashi Vishwanath, old city food walk.' },
            { day: 3, title: 'Sarnath & Departure', activity: 'Dhamek Stupa, museum, drop at airport.' }
        ],
        inclusions: ['2 nights hotel near the ghats', 'Breakfast', 'Boat rides', 'Local guide & cab'],
        exclusions: ['Flights', ...STD_EXCLUSIONS]
    },
    {
        title: 'Andaman Island Escape',
        description: 'Turquoise water at Radhanagar — one of Asia’s best beaches — snorkelling at Elephant Beach and the haunting history of the Cellular Jail.',
        location: 'Andaman & Nicobar Islands',
        price: 29999, originalPrice: 34999,
        duration: '6D/5N', category: 'Beach', tag: 'Island Life', isFeatured: false,
        rating: 4.9, reviewCount: 118, difficulty: 'Easy',
        bestSeason: 'Oct – May', groupSize: 'Private / 2+', altitude: '—',
        image: u('photo-1586500036706-41963de24d8b'),
        images: [u('photo-1586500036706-41963de24d8b')],
        highlights: ['Radhanagar beach sunset', 'Snorkelling at Elephant Beach', 'Cellular Jail light & sound show', 'Natural Bridge at Neil Island'],
        itinerary: [
            { day: 1, title: 'Arrive Port Blair', activity: 'Corbyn’s Cove, Cellular Jail light & sound show.' },
            { day: 2, title: 'Port Blair → Havelock', activity: 'Ferry to Havelock, sunset at Radhanagar beach.' },
            { day: 3, title: 'Elephant Beach', activity: 'Boat to Elephant Beach, snorkelling included.' },
            { day: 4, title: 'Havelock → Neil', activity: 'Ferry to Neil, Natural Bridge and Laxmanpur beach.' },
            { day: 5, title: 'Neil → Port Blair', activity: 'Ferry back, shopping at Aberdeen Bazaar.' },
            { day: 6, title: 'Departure', activity: 'Drop at airport.' }
        ],
        inclusions: ['5 nights beach resorts', 'Breakfast', 'All ferry tickets', 'Snorkelling session', 'Private cab'],
        exclusions: ['Flights', 'Scuba diving', ...STD_EXCLUSIONS]
    }
];
