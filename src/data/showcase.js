const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1400`;

// Months are 0-indexed (0 = Jan). `search` feeds /packages?search=…
export const destinations = [
    { name: 'Chakrata', region: 'Uttarakhand', img: '/chakrata-group.webp', line: 'Deodar silence & hidden waterfalls', months: [2, 3, 4, 5, 8, 9, 10, 11], search: 'Chakrata' },
    { name: 'Ladakh', region: 'Union Territory', img: '/ladakh-hero.webp', line: 'Highest passes, bluest lakes', months: [5, 6, 7, 8], search: 'Ladakh' },
    { name: 'Kashmir', region: 'Jammu & Kashmir', img: '/kashmir.webp', line: 'Houseboats, meadows & snow', months: [0, 1, 2, 3, 4, 5, 11], search: 'Kashmir' },
    { name: 'Kedarnath', region: 'Uttarakhand', img: '/kedarnath-hero.webp', line: 'A pilgrimage above the clouds', months: [4, 5, 8, 9], search: 'Kedarnath' },
    { name: 'Spiti', region: 'Himachal Pradesh', img: u('photo-1626621341517-bbf3d9990a23'), line: 'The cold desert of monasteries', months: [5, 6, 7, 8, 9], search: 'Spiti' },
    { name: 'Rajasthan', region: 'Land of Kings', img: '/rajasthan-fort.webp', line: 'Forts, palaces & desert stars', months: [0, 1, 2, 9, 10, 11], search: 'Rajasthan' },
    { name: 'Manali', region: 'Himachal Pradesh', img: u('photo-1605649487212-47bdab064df7'), line: 'Snow days & riverside cafés', months: [0, 1, 2, 3, 4, 5, 9, 10, 11], search: 'Manali' },
    { name: 'Sikkim', region: 'Eastern Himalaya', img: u('photo-1464822759023-fed622ff2c3b'), line: 'Kanchenjunga at sunrise', months: [2, 3, 4, 9, 10, 11], search: 'Sikkim' },
];

// Extra seasonal picks that aren't in the showcase
export const seasonalExtras = [
    { name: 'Kedarkantha', region: 'Snow trek', img: u('photo-1551524559-8af4e6624178'), line: 'India’s favourite winter summit', months: [0, 1, 2, 3, 11], search: 'Kedarkantha' },
    { name: 'Valley of Flowers', region: 'Monsoon trek', img: u('photo-1506905925346-21bda4d32df4'), line: 'A UNESCO valley in full bloom', months: [6, 7, 8], search: 'Valley of Flowers' },
    { name: 'Rishikesh', region: 'Uttarakhand', img: u('photo-1506744038136-46273834b3fb'), line: 'Rapids, yoga & Ganga aarti', months: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11], search: 'Rishikesh' },
    { name: 'Kerala', region: 'God’s Own Country', img: u('photo-1602216056096-3b40cc0c9944'), line: 'Backwaters by houseboat', months: [0, 1, 2, 8, 9, 10, 11], search: 'Kerala' },
    { name: 'Goa', region: 'Konkan coast', img: u('photo-1512343879784-a960bf40e7f2'), line: 'Beaches, shacks & sunsets', months: [0, 1, 10, 11], search: 'Goa' },
    { name: 'Andaman', region: 'Islands', img: u('photo-1586500036706-41963de24d8b'), line: 'Turquoise water & coral reefs', months: [0, 1, 2, 3, 4, 9, 10, 11], search: 'Andaman' },
];

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
