export const cateringHeaderData = {
  title: "IMFL Drinks + FOOD",
  code: "T45665467",
  rating: 4.1,
  totalReviews: 3,

  locations: {
    primary: "Sector 63, Noida",
    more: [
      "Sector 18, Noida",
      "Sector 62, Noida",
      "Indirapuram",
      "Vaishali",
      "Ghaziabad",
      "Greater Noida",
      "Noida Extension",
      "Delhi NCR",
    ],
  },

  stats: {
    completed: 234,
  },

  pricing: {
    mrp: 2000,
    offer: 1500,
    total: 1200,
    advance: 1200,
    balance: 9000,
  },

  dateTime: {
    date: "10 April 2025",
    time: "10PM Onwards",
    guests: "12 Guests",
  },

  features: [
    { text: "3 Starters + 2 Main Course", highlight: true },
    { text: "2 Mocktails + 2 Soft drinks" },
    { text: "Dessert" },
    { text: "3h" },
    { text: "1.5h" },
    { text: "Pure Veg" },
  ],

  reviews: [
    {
      user: "Rahul",
      rating: 5,
      comment: "Amazing food quality and service!",
    },
    {
      user: "Ankit",
      rating: 4,
      comment: "Very professional staff.",
    },
    {
      user: "Neha",
      rating: 3.5,
      comment: "Good but can improve presentation.",
    },
  ],
};

export const packageMenuData = {
  food: {
    starters: {
      veg: [
        {
          id: 1,
          name: "Veg Spring Roll",
          desc: "Crispy fried rolls",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 2,
          name: "Paneer Tikka",
          desc: "Smoky grilled paneer",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 3,
          name: "Hara Bhara Kabab",
          desc: "Spinach veg kabab",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 4,
          name: "Veg Cutlet",
          desc: "Crispy cutlet",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
      ],
      nonveg: [
        {
          id: 101,
          name: "Chicken Lollipop",
          desc: "Spicy fried chicken",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 102,
          name: "Chicken Tikka",
          desc: "Tandoori chicken",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 103,
          name: "Fish Finger",
          desc: "Crunchy fish sticks",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 104,
          name: "Mutton Seekh",
          desc: "Juicy seekh kabab",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
      ],
    },

    mains: {
      veg: [
        {
          id: 201,
          name: "Corn Chaat",
          desc: "Refreshing chaat",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 202,
          name: "Paneer Butter Masala",
          desc: "Rich gravy paneer",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 203,
          name: "Veg Biryani",
          desc: "Aromatic rice",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 204,
          name: "Mix Veg Curry",
          desc: "Seasonal veggies",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
      ],
      nonveg: [
        {
          id: 301,
          name: "Chicken Curry",
          desc: "Spicy chicken gravy",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 302,
          name: "Butter Chicken",
          desc: "Creamy chicken",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 303,
          name: "Fish Curry",
          desc: "Traditional fish curry",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 304,
          name: "Mutton Rogan Josh",
          desc: "Kashmiri mutton",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
      ],
    },

    desserts: {
      veg: [
        {
          id: 401,
          name: "Gulab Jamun",
          desc: "Milk sweet balls",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 402,
          name: "Rasgulla",
          desc: "Soft cheese balls",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 403,
          name: "Ice Cream",
          desc: "Vanilla scoop",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 404,
          name: "Brownie",
          desc: "Chocolate brownie",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
      ],
    },
  },

  nonAlcoholic: {
    drinks: {
      veg: [
        {
          id: 501,
          name: "Fresh Lime Soda",
          desc: "Refreshing lime",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 502,
          name: "Cold Coffee",
          desc: "Chilled coffee",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 503,
          name: "Mojito",
          desc: "Mint cooler",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 504,
          name: "Orange Juice",
          desc: "Fresh juice",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
      ],
    },
  },

  alcoholic: {
    drinks: {
      veg: [
        {
          id: 601,
          name: "Beer",
          desc: "Chilled beer",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 602,
          name: "Whisky",
          desc: "Premium whisky",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 603,
          name: "Vodka",
          desc: "Smooth vodka",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
        {
          id: 604,
          name: "Rum",
          desc: "Dark rum",
          img: "https://i.imgur.com/1y0Z7bP.jpg",
        },
      ],
    },
  },
};
