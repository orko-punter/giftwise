// Gift recommendation engine that works with any combination of inputs
import { searchProducts } from './productService'

const GIFT_DATABASE = {
  // Experiences - non-physical gifts
  experiences: [
    {
      name: "Spa Pass",
      icon: "🧖",
      description: "A relaxing spa day with massage, facial, and wellness treatments",
      priceRange: "$50 - $300",
      reason: "Perfect for relaxation and self-care",
      type: "experience"
    },
    {
      name: "Movie Tickets",
      icon: "🎬",
      description: "Tickets to the latest movies at a premium theater",
      priceRange: "$15 - $50",
      reason: "Great for entertainment and date nights",
      type: "experience"
    },
    {
      name: "Arcade Tickets",
      icon: "🎮",
      description: "Fun-filled arcade gaming session with tokens and prizes",
      priceRange: "$20 - $100",
      reason: "Perfect for fun and excitement",
      type: "experience"
    },
    {
      name: "Skating Rink Pass",
      icon: "⛸️",
      description: "Ice skating or roller skating session tickets",
      priceRange: "$15 - $40",
      reason: "Active and fun experience",
      type: "experience"
    },
    {
      name: "Concert Tickets",
      icon: "🎵",
      description: "Tickets to see their favorite artist or band live",
      priceRange: "$50 - $500+",
      reason: "Creates lasting memories",
      type: "experience"
    },
    {
      name: "Cooking Class",
      icon: "👨‍🍳",
      description: "Learn to cook with professional chefs",
      priceRange: "$50 - $200",
      reason: "Educational and fun experience",
      type: "experience"
    },
    {
      name: "Adventure Activity",
      icon: "🎢",
      description: "Theme park tickets, adventure sports, or outdoor activities",
      priceRange: "$50 - $300",
      reason: "Thrilling and memorable",
      type: "experience"
    },
    {
      name: "Workshop or Course",
      icon: "🎓",
      description: "Photography, art, or skill-building workshop",
      priceRange: "$30 - $200",
      reason: "Learn something new",
      type: "experience"
    },
    {
      name: "Dining Experience",
      icon: "🍽️",
      description: "Fine dining at a premium restaurant",
      priceRange: "$100 - $500+",
      reason: "Culinary delight",
      type: "experience"
    },
    {
      name: "Theater Show",
      icon: "🎭",
      description: "Tickets to a play, musical, or live performance",
      priceRange: "$40 - $300",
      reason: "Cultural and entertaining",
      type: "experience"
    }
  ],

  // Materials - physical gifts
  materials: [
    {
      name: "Gift Card",
      icon: "💳",
      description: "A versatile gift card to their favorite store or restaurant",
      priceRange: "$25 - $500+",
      reason: "Works for anyone, any occasion",
      type: "material"
    },
    {
      name: "Quality Coffee or Tea Set",
      icon: "☕",
      description: "Premium coffee beans or a curated tea collection",
      priceRange: "$20 - $100",
      reason: "Appreciated by most people",
      type: "material"
    },
    {
      name: "Books",
      icon: "📚",
      description: "Bestsellers or books in their favorite genre",
      priceRange: "$15 - $50",
      reason: "Thoughtful and personal",
      type: "material"
    },
    {
      name: "Spa Products Set",
      icon: "🛁",
      description: "Luxury bath and body products, essential oils, and wellness items",
      priceRange: "$30 - $150",
      reason: "Perfect for relaxation at home",
      type: "material"
    },
    {
      name: "Chocolate Gift Box",
      icon: "🍫",
      description: "Premium chocolates and confectionery",
      priceRange: "$20 - $100",
      reason: "Sweet treat for anyone",
      type: "material"
    },
    {
      name: "Flowers",
      icon: "🌹",
      description: "Fresh flower bouquet or arrangement",
      priceRange: "$25 - $150",
      reason: "Classic and beautiful",
      type: "material"
    }
  ],

  // Age-based gifts
  age: {
    "0-12": [
      { name: "Educational Toys", icon: "🧩", description: "STEM toys, puzzles, or building sets", priceRange: "$20 - $100", type: "material" },
      { name: "Art Supplies", icon: "🎨", description: "Crayons, markers, paint sets, or craft kits", priceRange: "$15 - $50", type: "material" },
      { name: "Books", icon: "📖", description: "Age-appropriate books or book series", priceRange: "$10 - $40", type: "material" },
      { name: "Theme Park Tickets", icon: "🎢", description: "Amusement park or kids' activity center passes", priceRange: "$30 - $150", type: "experience" },
      { name: "Kids Workshop", icon: "🎨", description: "Art, science, or craft workshop for children", priceRange: "$25 - $100", type: "experience" }
    ],
    "13-17": [
      { name: "Tech Accessories", icon: "🎧", description: "Headphones, phone cases, or gaming accessories", priceRange: "$25 - $150", type: "material" },
      { name: "Fashion Items", icon: "👕", description: "Clothing, accessories, or gift cards to favorite stores", priceRange: "$30 - $200", type: "material" },
      { name: "Movie Tickets", icon: "🎬", description: "Tickets to the latest blockbusters", priceRange: "$15 - $50", type: "experience" },
      { name: "Arcade Pass", icon: "🎮", description: "Gaming arcade tokens and passes", priceRange: "$20 - $100", type: "experience" },
      { name: "Concert Tickets", icon: "🎵", description: "Tickets to see favorite artists", priceRange: "$50 - $300", type: "experience" }
    ],
    "18-30": [
      { name: "Tech Gadgets", icon: "📱", description: "Smart devices, accessories, or tech upgrades", priceRange: "$50 - $500+", type: "material" },
      { name: "Subscription Boxes", icon: "📦", description: "Monthly subscription to their interests", priceRange: "$20 - $50/month", type: "material" },
      { name: "Travel Accessories", icon: "✈️", description: "Luggage, travel gear, or travel experiences", priceRange: "$50 - $300", type: "material" },
      { name: "Spa Day", icon: "🧖", description: "Full spa experience with treatments", priceRange: "$80 - $300", type: "experience" },
      { name: "Adventure Activity", icon: "🎢", description: "Bungee jumping, skydiving, or adventure sports", priceRange: "$100 - $500", type: "experience" },
      { name: "Concert or Festival", icon: "🎵", description: "Music festival or concert tickets", priceRange: "$50 - $500+", type: "experience" }
    ],
    "31-50": [
      { name: "Home Decor", icon: "🏠", description: "Artwork, plants, or home accessories", priceRange: "$30 - $500+", type: "material" },
      { name: "Kitchen Gadgets", icon: "🍳", description: "Premium kitchen tools or appliances", priceRange: "$40 - $400", type: "material" },
      { name: "Wine or Spirits", icon: "🍷", description: "Quality wine, whiskey, or craft spirits", priceRange: "$30 - $200", type: "material" },
      { name: "Spa Retreat", icon: "🧖", description: "Luxury spa day or wellness retreat", priceRange: "$100 - $500", type: "experience" },
      { name: "Fine Dining", icon: "🍽️", description: "Premium restaurant dining experience", priceRange: "$100 - $500+", type: "experience" },
      { name: "Theater Show", icon: "🎭", description: "Broadway show or live performance tickets", priceRange: "$50 - $400", type: "experience" }
    ],
    "51+": [
      { name: "Comfort Items", icon: "🛋️", description: "Cozy blankets, slippers, or comfort accessories", priceRange: "$25 - $150", type: "material" },
      { name: "Hobby Supplies", icon: "🎣", description: "Items related to their hobbies or interests", priceRange: "$30 - $300", type: "material" },
      { name: "Spa Day", icon: "🧖", description: "Relaxing spa experience with massage and treatments", priceRange: "$80 - $300", type: "experience" },
      { name: "Theater Tickets", icon: "🎭", description: "Classic theater show or musical performance", priceRange: "$50 - $300", type: "experience" },
      { name: "Cooking Class", icon: "👨‍🍳", description: "Culinary workshop or cooking experience", priceRange: "$60 - $200", type: "experience" }
    ]
  },

  // Occasion-based gifts
  occasion: {
    "birthday": [
      { name: "Birthday Cake", icon: "🎂", description: "Custom birthday cake", priceRange: "$30 - $150", type: "material" },
      { name: "Birthday Experience", icon: "🎉", description: "Special activity or adventure for their special day", priceRange: "$50 - $500+", type: "experience" },
      { name: "Movie Night Out", icon: "🎬", description: "Movie tickets and dinner package", priceRange: "$50 - $200", type: "experience" }
    ],
    "anniversary": [
      { name: "Romantic Dinner", icon: "🍽️", description: "Fine dining experience at a premium restaurant", priceRange: "$100 - $500+", type: "experience" },
      { name: "Jewelry", icon: "💍", description: "Elegant jewelry piece", priceRange: "$100 - $5000+", type: "material" },
      { name: "Custom Photo Book", icon: "📸", description: "Personalized photo album or book", priceRange: "$30 - $150", type: "material" },
      { name: "Spa Couple's Package", icon: "🧖", description: "Couple's spa day experience", priceRange: "$150 - $400", type: "experience" }
    ],
    "wedding": [
      { name: "Kitchen Appliances", icon: "🍳", description: "High-quality kitchen equipment for their new home", priceRange: "$50 - $500+", type: "material" },
      { name: "Home Decor", icon: "🏡", description: "Decorative items for their new home", priceRange: "$30 - $500+", type: "material" },
      { name: "Honeymoon Experience", icon: "💑", description: "Romantic getaway or experience package", priceRange: "$200 - $2000+", type: "experience" },
      { name: "Spa Honeymoon Package", icon: "🧖", description: "Luxury spa experience for the couple", priceRange: "$150 - $500", type: "experience" }
    ],
    "graduation": [
      { name: "Professional Accessories", icon: "💼", description: "Briefcase, watch, or professional items", priceRange: "$50 - $500+", type: "material" },
      { name: "Tech for Work", icon: "💻", description: "Laptop accessories, tablet, or work tools", priceRange: "$50 - $1000+", type: "material" },
      { name: "Travel Experience", icon: "🌍", description: "Trip or travel vouchers for their next adventure", priceRange: "$200 - $2000+", type: "experience" },
      { name: "Adventure Trip", icon: "✈️", description: "Adventure travel or experience package", priceRange: "$300 - $2000+", type: "experience" }
    ],
    "holiday": [
      { name: "Holiday Decorations", icon: "🎄", description: "Seasonal decorations or ornaments", priceRange: "$20 - $200", type: "material" },
      { name: "Cozy Items", icon: "🧦", description: "Warm clothing, blankets, or comfort items", priceRange: "$25 - $150", type: "material" },
      { name: "Holiday Food Basket", icon: "🍪", description: "Gourmet food basket or treats", priceRange: "$30 - $200", type: "material" },
      { name: "Holiday Show Tickets", icon: "🎭", description: "Theater or concert tickets for holiday season", priceRange: "$40 - $300", type: "experience" },
      { name: "Ice Skating", icon: "⛸️", description: "Ice skating rink passes for the holidays", priceRange: "$20 - $80", type: "experience" }
    ]
  },

  // Interest-based gifts
  interests: {
    "photography": [
      { name: "Camera Accessories", icon: "📷", description: "Lenses, tripods, or camera bags", priceRange: "$50 - $500+", type: "material" },
      { name: "Photo Editing Software", icon: "🖼️", description: "Adobe Creative Cloud or editing tools", priceRange: "$10 - $50/month", type: "material" },
      { name: "Photography Workshop", icon: "🎓", description: "Online or in-person photography class", priceRange: "$50 - $500", type: "experience" }
    ],
    "cooking": [
      { name: "Premium Cookware", icon: "🍳", description: "High-quality pots, pans, or kitchen tools", priceRange: "$50 - $500+", type: "material" },
      { name: "Cooking Classes", icon: "👨‍🍳", description: "Culinary classes or workshops", priceRange: "$50 - $300", type: "experience" },
      { name: "Gourmet Ingredients", icon: "🧂", description: "Premium spices, oils, or specialty foods", priceRange: "$30 - $200", type: "material" }
    ],
    "travel": [
      { name: "Travel Gear", icon: "🧳", description: "Luggage, packing cubes, or travel accessories", priceRange: "$50 - $500+", type: "material" },
      { name: "Travel Guide Books", icon: "🗺️", description: "Guidebooks or travel planning resources", priceRange: "$15 - $50", type: "material" },
      { name: "Travel Experience", icon: "✈️", description: "Flight vouchers or travel gift cards", priceRange: "$100 - $2000+", type: "experience" }
    ],
    "music": [
      { name: "Concert Tickets", icon: "🎵", description: "Tickets to see their favorite artist", priceRange: "$50 - $500+", type: "experience" },
      { name: "Music Equipment", icon: "🎸", description: "Instruments, headphones, or audio gear", priceRange: "$50 - $1000+", type: "material" },
      { name: "Music Streaming Subscription", icon: "🎧", description: "Premium music service subscription", priceRange: "$10 - $15/month", type: "material" }
    ],
    "reading": [
      { name: "E-Reader", icon: "📱", description: "Kindle or other e-reader device", priceRange: "$80 - $300", type: "material" },
      { name: "Book Subscription", icon: "📚", description: "Monthly book subscription box", priceRange: "$15 - $50/month", type: "material" },
      { name: "Reading Accessories", icon: "👓", description: "Book lights, bookmarks, or reading chair", priceRange: "$20 - $200", type: "material" }
    ],
    "fitness": [
      { name: "Fitness Equipment", icon: "🏋️", description: "Weights, yoga mat, or workout gear", priceRange: "$30 - $500+", type: "material" },
      { name: "Fitness Tracker", icon: "⌚", description: "Smartwatch or fitness tracking device", priceRange: "$50 - $500+", type: "material" },
      { name: "Gym Membership", icon: "💪", description: "Gym or fitness class membership", priceRange: "$30 - $150/month", type: "experience" }
    ],
    "gaming": [
      { name: "Gaming Accessories", icon: "🎮", description: "Controllers, headsets, or gaming gear", priceRange: "$50 - $300", type: "material" },
      { name: "Game Subscriptions", icon: "🎯", description: "Gaming service subscriptions or gift cards", priceRange: "$10 - $60", type: "material" },
      { name: "Gaming Chair", icon: "🪑", description: "Ergonomic gaming chair", priceRange: "$100 - $500+", type: "material" },
      { name: "Arcade Experience", icon: "🎮", description: "Arcade gaming session or gaming event tickets", priceRange: "$20 - $100", type: "experience" }
    ]
  },

  // Budget-based filtering
  budget: {
    "under-25": [
      { name: "Gourmet Coffee/Tea", icon: "☕", description: "Premium coffee beans or tea collection", priceRange: "$15 - $25", type: "material" },
      { name: "Candles", icon: "🕯️", description: "Scented candles or candle set", priceRange: "$10 - $25", type: "material" },
      { name: "Books", icon: "📚", description: "Bestseller books or book set", priceRange: "$10 - $25", type: "material" },
      { name: "Gift Card", icon: "💳", description: "Gift card to their favorite store", priceRange: "$10 - $25", type: "material" },
      { name: "Movie Tickets", icon: "🎬", description: "Tickets to the latest movies", priceRange: "$15 - $25", type: "experience" }
    ],
    "25-50": [
      { name: "Subscription Box", icon: "📦", description: "One-month subscription box", priceRange: "$25 - $50", type: "material" },
      { name: "Kitchen Gadgets", icon: "🍳", description: "Quality kitchen tools or accessories", priceRange: "$25 - $50", type: "material" },
      { name: "Home Decor", icon: "🖼️", description: "Artwork, plants, or decorative items", priceRange: "$25 - $50", type: "material" },
      { name: "Arcade Tickets", icon: "🎮", description: "Arcade gaming session passes", priceRange: "$25 - $50", type: "experience" }
    ],
    "50-100": [
      { name: "Tech Accessories", icon: "📱", description: "Phone cases, headphones, or tech items", priceRange: "$50 - $100", type: "material" },
      { name: "Movie & Dinner", icon: "🎬", description: "Movie tickets and dinner package", priceRange: "$50 - $100", type: "experience" },
      { name: "Spa Pass", icon: "🧖", description: "Relaxing spa treatment session", priceRange: "$50 - $100", type: "experience" },
      { name: "Premium Items", icon: "⭐", description: "Higher quality version of their interests", priceRange: "$50 - $100", type: "material" }
    ],
    "100-250": [
      { name: "Quality Electronics", icon: "📺", description: "Small electronics or tech upgrades", priceRange: "$100 - $250", type: "material" },
      { name: "Spa Experience", icon: "🧖", description: "Full spa day or wellness package", priceRange: "$100 - $250", type: "experience" },
      { name: "Concert Tickets", icon: "🎵", description: "Tickets to see favorite artists", priceRange: "$100 - $250", type: "experience" },
      { name: "Premium Gifts", icon: "💎", description: "High-quality items in their interest area", priceRange: "$100 - $250", type: "material" }
    ],
    "250-500": [
      { name: "Major Electronics", icon: "💻", description: "Tablets, smart devices, or tech", priceRange: "$250 - $500", type: "material" },
      { name: "Luxury Items", icon: "✨", description: "Premium gifts in their category", priceRange: "$250 - $500", type: "material" },
      { name: "Experience Packages", icon: "🎁", description: "Multi-day experiences or packages", priceRange: "$250 - $500", type: "experience" },
      { name: "Fine Dining Experience", icon: "🍽️", description: "Premium restaurant dining", priceRange: "$250 - $500", type: "experience" }
    ],
    "500-plus": [
      { name: "High-End Electronics", icon: "📱", description: "Premium tech devices or upgrades", priceRange: "$500+", type: "material" },
      { name: "Luxury Experiences", icon: "🌟", description: "Exclusive experiences or trips", priceRange: "$500+", type: "experience" },
      { name: "Premium Collections", icon: "💎", description: "High-end items or collections", priceRange: "$500+", type: "material" }
    ]
  }
}

export async function getRecommendations(data) {
  const { person = {}, event = {} } = data
  const recommendations = new Set()
  const recArray = []
  
  // Fetch real products from Blinkit/Swiggy/Instamart
  let realProducts = []
  try {
    const interests = person.interests || person.hobbies || ''
    realProducts = await searchProducts({
      interests,
      budget: event.budget,
      maxResults: 5
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    // Continue with generic recommendations if product fetch fails
  }

  // If no information provided, return structure with general gifts
  if (Object.keys(person).length === 0 && Object.keys(event).length === 0) {
    const experiences = GIFT_DATABASE.experiences.slice(0, 5).map(e => ({
      ...e,
      reason: "Great experience gift idea"
    }))
    const materials = GIFT_DATABASE.materials.slice(0, 5).map(m => ({
      ...m,
      reason: "Great material gift idea"
    }))
    
    return {
      realProducts: realProducts.map(p => ({
        ...p,
        type: 'product',
        orderable: true,
        platformName: p.platform === 'blinkit' ? 'Blinkit' : 
                      p.platform === 'swiggy' ? 'Swiggy Instamart' : 
                      'Instamart'
      })),
      experiences,
      materials
    }
  }

  // Age-based recommendations
  if (person.age) {
    const age = parseInt(person.age)
    let ageGroup = "31-50" // default
    if (age <= 12) ageGroup = "0-12"
    else if (age <= 17) ageGroup = "13-17"
    else if (age <= 30) ageGroup = "18-30"
    else if (age <= 50) ageGroup = "31-50"
    else ageGroup = "51+"

    if (GIFT_DATABASE.age[ageGroup]) {
      GIFT_DATABASE.age[ageGroup].forEach(gift => {
        const key = `${gift.name}-${gift.icon}`
        if (!recommendations.has(key)) {
          recommendations.add(key)
          recArray.push({ ...gift, reason: `Perfect for someone ${age} years old` })
        }
      })
    }
  }

  // Occasion-based recommendations
  if (event.occasion && GIFT_DATABASE.occasion[event.occasion]) {
    GIFT_DATABASE.occasion[event.occasion].forEach(gift => {
      const key = `${gift.name}-${gift.icon}`
      if (!recommendations.has(key)) {
        recommendations.add(key)
        recArray.push({ ...gift, reason: `Great for ${event.occasion}` })
      }
    })
  }

  // Interest-based recommendations
  if (person.interests) {
    const interests = person.interests.toLowerCase()
    Object.keys(GIFT_DATABASE.interests).forEach(interest => {
      if (interests.includes(interest)) {
        GIFT_DATABASE.interests[interest].forEach(gift => {
          const key = `${gift.name}-${gift.icon}`
          if (!recommendations.has(key)) {
            recommendations.add(key)
            recArray.push({ ...gift, reason: `Matches their interest in ${interest}` })
          }
        })
      }
    })
  }

  // Hobby-based recommendations (similar to interests)
  if (person.hobbies) {
    const hobbies = person.hobbies.toLowerCase()
    Object.keys(GIFT_DATABASE.interests).forEach(interest => {
      if (hobbies.includes(interest)) {
        GIFT_DATABASE.interests[interest].forEach(gift => {
          const key = `${gift.name}-${gift.icon}`
          if (!recommendations.has(key)) {
            recommendations.add(key)
            recArray.push({ ...gift, reason: `Perfect for their hobby: ${interest}` })
          }
        })
      }
    })
  }

  // Budget-based filtering and recommendations
  if (event.budget && GIFT_DATABASE.budget[event.budget]) {
    GIFT_DATABASE.budget[event.budget].forEach(gift => {
      const key = `${gift.name}-${gift.icon}`
      if (!recommendations.has(key)) {
        recommendations.add(key)
        recArray.push({ ...gift, reason: `Fits your budget range` })
      }
    })
  }

  // If we have some recommendations, add fallback options
  if (recArray.length > 0) {
    // Add some experiences and materials as backup
    GIFT_DATABASE.experiences.slice(0, 2).forEach(gift => {
      const key = `${gift.name}-${gift.icon}`
      if (!recommendations.has(key) && recArray.length < 15) {
        recommendations.add(key)
        recArray.push({ ...gift, reason: "Great experience option" })
      }
    })
    GIFT_DATABASE.materials.slice(0, 2).forEach(gift => {
      const key = `${gift.name}-${gift.icon}`
      if (!recommendations.has(key) && recArray.length < 15) {
        recommendations.add(key)
        recArray.push({ ...gift, reason: "Great material option" })
      }
    })
  } else {
    // Fallback to general experiences and materials if we have some info but no matches
    GIFT_DATABASE.experiences.slice(0, 5).forEach(e => {
      recArray.push({ ...e, reason: "Great experience gift idea" })
    })
    GIFT_DATABASE.materials.slice(0, 5).forEach(m => {
      recArray.push({ ...m, reason: "Great material gift idea" })
    })
  }
  
  // Separate experiences and materials
  const experiences = recArray.filter(r => r.type === 'experience')
  const materials = recArray.filter(r => r.type === 'material')
  
  // Return both real products, experiences, and materials
  return {
    realProducts: realProducts.map(p => ({
      ...p,
      type: 'product',
      orderable: true,
      platformName: p.platform === 'blinkit' ? 'Blinkit' : 
                    p.platform === 'swiggy' ? 'Swiggy Instamart' : 
                    'Instamart'
    })),
    experiences: experiences.slice(0, 8),
    materials: materials.slice(0, 8)
  }
}

