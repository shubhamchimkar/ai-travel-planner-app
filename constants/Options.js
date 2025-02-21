export const SelectTravelerList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: "✈️",
        people: '1'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Perfect for partners exploring together',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Ideal for a family getaway',
        icon: '🏡',
        people: '3 to5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Great for a fun trip with friends',
        icon: '⛵',
        people: '5 to 10 People'
    }
];

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸'
    }
]

export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} days and {totalNight} night for {traveler} with a {budget} with a Flight details, Flight Price approx(in Indian Rupees) with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.'
