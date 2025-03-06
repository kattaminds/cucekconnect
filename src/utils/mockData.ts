
import { 
  Building, 
  StudyGroup, 
  Doubt, 
  FoodVendor, 
  IncidentReport, 
  EmergencyAlert, 
  LibraryBook 
} from '@/types';

// Helper to generate random int between min and max (inclusive)
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Buildings with study spaces
const buildings: Building[] = [
  {
    id: 'building-1',
    name: 'Main Library',
    description: 'The primary campus library with multiple study areas and resources.',
    location: { x: 120, y: 150 },
    occupancy: 342,
    maxOccupancy: 500,
    image: '/library.jpg',
    floors: [
      {
        id: 'floor-1-1',
        name: 'Ground Floor',
        studySpaces: [
          {
            id: 'space-1-1-1',
            name: 'Quiet Study Area',
            capacity: 50,
            currentOccupancy: 32,
            amenities: ['Power outlets', 'Wi-Fi', 'Natural lighting', 'Individual desks'],
            isReservable: false,
            isAvailable: true,
          },
          {
            id: 'space-1-1-2',
            name: 'Computer Lab',
            capacity: 30,
            currentOccupancy: 25,
            amenities: ['Computers', 'Printing', 'Technical support', 'Software'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
      {
        id: 'floor-1-2',
        name: 'First Floor',
        studySpaces: [
          {
            id: 'space-1-2-1',
            name: 'Group Study Rooms',
            capacity: 40,
            currentOccupancy: 22,
            amenities: ['Whiteboards', 'Display screens', 'Soundproofing', 'Conference tables'],
            isReservable: true,
            isAvailable: true,
          },
          {
            id: 'space-1-2-2',
            name: 'Silent Reading Area',
            capacity: 60,
            currentOccupancy: 45,
            amenities: ['Comfortable seating', 'Reading lamps', 'No talking', 'Reference books'],
            isReservable: false,
            isAvailable: true,
          },
        ],
      },
    ],
  },
  {
    id: 'building-2',
    name: 'Science Center',
    description: 'Modern facility housing science departments with study spaces and laboratories.',
    location: { x: 250, y: 180 },
    occupancy: 215,
    maxOccupancy: 350,
    image: '/science-center.jpg',
    floors: [
      {
        id: 'floor-2-1',
        name: 'Main Floor',
        studySpaces: [
          {
            id: 'space-2-1-1',
            name: 'Innovation Hub',
            capacity: 40,
            currentOccupancy: 18,
            amenities: ['3D printers', 'Project tables', 'Collaboration space', 'Technical tools'],
            isReservable: true,
            isAvailable: true,
          },
          {
            id: 'space-2-1-2',
            name: 'Research Commons',
            capacity: 35,
            currentOccupancy: 30,
            amenities: ['Research materials', 'Dual monitors', 'Reference librarians', 'Databases'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
      {
        id: 'floor-2-2',
        name: 'Second Floor',
        studySpaces: [
          {
            id: 'space-2-2-1',
            name: 'Quiet Study Lounge',
            capacity: 50,
            currentOccupancy: 32,
            amenities: ['Lounge seating', 'Coffee station', 'Plants', 'Natural lighting'],
            isReservable: false,
            isAvailable: true,
          },
          {
            id: 'space-2-2-2',
            name: 'Graduate Student Area',
            capacity: 25,
            currentOccupancy: 15,
            amenities: ['Private cubbies', 'Lockers', 'Premium seating', 'Priority booking'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
    ],
  },
  {
    id: 'building-3',
    name: 'Student Union',
    description: 'Hub for student activities, dining, and casual study.',
    location: { x: 180, y: 220 },
    occupancy: 426,
    maxOccupancy: 600,
    image: '/student-union.jpg',
    floors: [
      {
        id: 'floor-3-1',
        name: 'Main Concourse',
        studySpaces: [
          {
            id: 'space-3-1-1',
            name: 'Café Study Area',
            capacity: 70,
            currentOccupancy: 55,
            amenities: ['Coffee shop', 'Food service', 'Casual seating', 'Ambient music'],
            isReservable: false,
            isAvailable: true,
          },
          {
            id: 'space-3-1-2',
            name: 'Media Lounge',
            capacity: 30,
            currentOccupancy: 22,
            amenities: ['Large displays', 'Gaming consoles', 'Media streaming', 'Comfortable seating'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
      {
        id: 'floor-3-2',
        name: 'Upper Level',
        studySpaces: [
          {
            id: 'space-3-2-1',
            name: 'Organization Offices',
            capacity: 40,
            currentOccupancy: 25,
            amenities: ['Meeting rooms', 'Office equipment', 'Student org resources', 'Event planning space'],
            isReservable: true,
            isAvailable: true,
          },
          {
            id: 'space-3-2-2',
            name: 'Multipurpose Room',
            capacity: 100,
            currentOccupancy: 0,
            amenities: ['Configurable furniture', 'Presentation equipment', 'Sound system', 'Event space'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
    ],
  },
  {
    id: 'building-4',
    name: 'Engineering Building',
    description: 'State-of-the-art facility for engineering studies and research.',
    location: { x: 300, y: 150 },
    occupancy: 280,
    maxOccupancy: 400,
    image: '/engineering.jpg',
    floors: [
      {
        id: 'floor-4-1',
        name: 'Ground Floor',
        studySpaces: [
          {
            id: 'space-4-1-1',
            name: 'Maker Space',
            capacity: 35,
            currentOccupancy: 20,
            amenities: ['Fabrication tools', 'Project materials', 'Technical support', 'Safety equipment'],
            isReservable: true,
            isAvailable: true,
          },
          {
            id: 'space-4-1-2',
            name: 'Design Studio',
            capacity: 40,
            currentOccupancy: 28,
            amenities: ['Drafting tables', 'CAD workstations', 'Plotting services', 'Model building area'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
      {
        id: 'floor-4-2',
        name: 'Third Floor',
        studySpaces: [
          {
            id: 'space-4-2-1',
            name: 'Robotics Lab',
            capacity: 25,
            currentOccupancy: 18,
            amenities: ['Robotics equipment', 'Programming stations', 'Testing area', 'Specialized tools'],
            isReservable: true,
            isAvailable: true,
          },
          {
            id: 'space-4-2-2',
            name: 'Collaboration Zone',
            capacity: 50,
            currentOccupancy: 38,
            amenities: ['Movable furniture', 'Writable walls', 'Project displays', 'Team pods'],
            isReservable: false,
            isAvailable: true,
          },
        ],
      },
    ],
  },
  {
    id: 'building-5',
    name: 'Arts Center',
    description: 'Creative spaces for visual and performing arts.',
    location: { x: 150, y: 280 },
    occupancy: 185,
    maxOccupancy: 300,
    image: '/arts-center.jpg',
    floors: [
      {
        id: 'floor-5-1',
        name: 'Main Gallery',
        studySpaces: [
          {
            id: 'space-5-1-1',
            name: 'Drawing Studio',
            capacity: 30,
            currentOccupancy: 22,
            amenities: ['Easels', 'Natural lighting', 'Model platforms', 'Material storage'],
            isReservable: true,
            isAvailable: true,
          },
          {
            id: 'space-5-1-2',
            name: 'Digital Media Lab',
            capacity: 25,
            currentOccupancy: 20,
            amenities: ['High-end computers', 'Creative software', 'Tablets', 'Scanning equipment'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
      {
        id: 'floor-5-2',
        name: 'Performance Level',
        studySpaces: [
          {
            id: 'space-5-2-1',
            name: 'Practice Rooms',
            capacity: 15,
            currentOccupancy: 8,
            amenities: ['Pianos', 'Soundproofing', 'Music stands', 'Recording equipment'],
            isReservable: true,
            isAvailable: true,
          },
          {
            id: 'space-5-2-2',
            name: 'Movement Studio',
            capacity: 30,
            currentOccupancy: 0,
            amenities: ['Sprung floor', 'Mirrors', 'Sound system', 'Ballet barres'],
            isReservable: true,
            isAvailable: true,
          },
        ],
      },
    ],
  },
];

// Study groups
const studyGroups: StudyGroup[] = [
  {
    id: 'group-1',
    name: 'Calculus II Study Session',
    description: 'Weekly study group for Calculus II focusing on integration techniques and applications.',
    subject: 'Mathematics',
    course: 'MATH 102 - Calculus II',
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    location: 'Main Library, Room 203',
    maxParticipants: 8,
    currentParticipants: 5,
    createdBy: 'user-2',
    members: ['user-2', 'user-3', 'user-4', 'user-5', 'user-6'],
  },
  {
    id: 'group-2',
    name: 'Organic Chemistry Prep',
    description: 'Preparation for the upcoming organic chemistry midterm. We\'ll be focusing on reaction mechanisms.',
    subject: 'Chemistry',
    course: 'CHEM 201 - Organic Chemistry',
    dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    location: 'Science Center, Room 105',
    maxParticipants: 6,
    currentParticipants: 4,
    createdBy: 'user-7',
    members: ['user-7', 'user-8', 'user-9', 'user-10'],
  },
  {
    id: 'group-3',
    name: 'Programming Fundamentals',
    description: 'Group for beginners learning Python programming fundamentals. We help each other with assignments and practice coding problems.',
    subject: 'Computer Science',
    course: 'CS 101 - Intro to Programming',
    dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    location: 'Engineering Building, Computer Lab 2',
    maxParticipants: 10,
    currentParticipants: 7,
    createdBy: 'user-11',
    members: ['user-11', 'user-12', 'user-13', 'user-14', 'user-15', 'user-16', 'user-17'],
  },
  {
    id: 'group-4',
    name: 'Art History Review',
    description: 'Visual analysis practice and discussion of key art movements for the final exam.',
    subject: 'Art History',
    course: 'ART 150 - Survey of Western Art',
    dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    location: 'Arts Center, Seminar Room A',
    maxParticipants: 12,
    currentParticipants: 8,
    createdBy: 'user-18',
    members: ['user-18', 'user-19', 'user-20', 'user-21', 'user-22', 'user-23', 'user-24', 'user-25'],
  },
  {
    id: 'group-5',
    name: 'Macroeconomics Discussion',
    description: 'Weekly discussion of macroeconomic principles and current economic events.',
    subject: 'Economics',
    course: 'ECON 201 - Principles of Macroeconomics',
    dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    location: 'Business Building, Room 302',
    maxParticipants: 15,
    currentParticipants: 9,
    createdBy: 'user-26',
    members: ['user-26', 'user-27', 'user-28', 'user-29', 'user-30', 'user-31', 'user-32', 'user-33', 'user-34'],
  },
];

// Doubts/Questions
const doubts: Doubt[] = [
  {
    id: 'doubt-1',
    title: 'Trouble understanding Fourier Transforms',
    description: 'I\'m struggling with the concept of Fourier transforms in signal processing. Could someone explain how to approach it intuitively?',
    subject: 'Electrical Engineering',
    course: 'EE 303 - Signals and Systems',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    anonymous: true,
    resolved: false,
    answers: [
      {
        id: 'answer-1-1',
        content: 'Think of Fourier transforms as breaking down a complex signal into its constituent frequencies. It\'s like decomposing a chord into individual notes. A good resource is 3blue1brown\'s YouTube video on the topic.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        createdBy: 'user-5',
        isInstructor: false,
      },
    ],
  },
  {
    id: 'doubt-2',
    title: 'Help with Shakespearean analysis',
    description: 'I need help identifying themes of power and corruption in Macbeth for my essay. Any insights or textual references would be appreciated.',
    subject: 'English Literature',
    course: 'ENG 220 - Shakespeare',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    anonymous: true,
    resolved: true,
    answers: [
      {
        id: 'answer-2-1',
        content: 'Look at Lady Macbeth\'s influence over her husband and how power corrupts both of them. Key scenes: the dagger soliloquy, the banquet with Banquo\'s ghost, and Lady Macbeth\'s sleepwalking.',
        createdAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'user-8',
        isInstructor: false,
      },
      {
        id: 'answer-2-2',
        content: 'Consider the motif of blood throughout the play as a symbol of guilt and corruption. The quote "Will all great Neptune\'s ocean wash this blood clean from my hand?" is particularly relevant.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'user-35',
        isInstructor: true,
      },
    ],
  },
  {
    id: 'doubt-3',
    title: 'Confused about statistical significance',
    description: 'I\'m not fully understanding p-values and when to reject the null hypothesis. Could someone explain in simpler terms?',
    subject: 'Statistics',
    course: 'STAT 201 - Introduction to Statistics',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    anonymous: true,
    resolved: false,
    answers: [],
  },
  {
    id: 'doubt-4',
    title: 'Need help with stoichiometry calculations',
    description: 'I\'m struggling with balancing chemical equations and calculating mole ratios. Could someone provide step-by-step guidance?',
    subject: 'Chemistry',
    course: 'CHEM 101 - General Chemistry',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    anonymous: true,
    resolved: true,
    answers: [
      {
        id: 'answer-4-1',
        content: 'First, balance the equation to ensure the same number of each atom on both sides. Then, convert masses to moles using molar mass. Finally, use the mole ratio from the balanced equation to convert between reactants and products.',
        createdAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'user-12',
        isInstructor: false,
      },
      {
        id: 'answer-4-2',
        content: 'Let me walk through an example: For the reaction 2H₂ + O₂ → 2H₂O, if you have 4g of H₂, how much O₂ do you need? 4g H₂ = 2 moles. The ratio is 2:1, so you need 1 mole of O₂, which is 32g.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'user-36',
        isInstructor: true,
      },
    ],
  },
  {
    id: 'doubt-5',
    title: 'Debugging recursive functions',
    description: 'My recursive function for calculating Fibonacci numbers is causing a stack overflow error. How do I fix this and make it more efficient?',
    subject: 'Computer Science',
    course: 'CS 201 - Data Structures',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    anonymous: true,
    resolved: false,
    answers: [
      {
        id: 'answer-5-1',
        content: 'The classic recursive Fibonacci implementation has exponential time complexity because it recalculates values multiple times. Use memoization (store previously calculated values) or switch to an iterative approach.',
        createdAt: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'user-15',
        isInstructor: false,
      },
    ],
  },
];

// Food vendors
const foodVendors: FoodVendor[] = [
  {
    id: 'vendor-1',
    name: 'Campus Café',
    description: 'Healthy, fresh options including salads, sandwiches, and smoothies.',
    image: '/cafe.jpg',
    rating: 4.3,
    cuisineType: 'Healthy/Café',
    deliveryTime: '15-25 min',
    menu: [
      {
        id: 'item-1-1',
        name: 'Avocado Toast',
        description: 'Whole grain toast with smashed avocado, cherry tomatoes, and microgreens',
        price: 7.99,
        image: '/avocado-toast.jpg',
        category: 'Breakfast',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-1-2',
        name: 'Greek Yogurt Bowl',
        description: 'Greek yogurt with honey, granola, and mixed berries',
        price: 6.49,
        category: 'Breakfast',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-1-3',
        name: 'Mediterranean Wrap',
        description: 'Hummus, falafel, cucumber, tomato, and tzatziki in a whole wheat wrap',
        price: 8.99,
        category: 'Lunch',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-1-4',
        name: 'Berry Blast Smoothie',
        description: 'Mixed berries, banana, almond milk, and protein powder',
        price: 5.99,
        category: 'Drinks',
        isVegetarian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: 'vendor-2',
    name: 'Pizza Palace',
    description: 'Handcrafted pizzas with artisanal toppings and fresh ingredients.',
    image: '/pizza.jpg',
    rating: 4.5,
    cuisineType: 'Italian',
    deliveryTime: '20-30 min',
    menu: [
      {
        id: 'item-2-1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil',
        price: 12.99,
        image: '/margherita.jpg',
        category: 'Pizza',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-2-2',
        name: 'Pepperoni Pizza',
        description: 'Tomato sauce, mozzarella, and pepperoni',
        price: 14.99,
        category: 'Pizza',
        isVegetarian: false,
        isAvailable: true,
      },
      {
        id: 'item-2-3',
        name: 'Garden Vegetable Pizza',
        description: 'Tomato sauce, mozzarella, bell peppers, onions, mushrooms, and olives',
        price: 13.99,
        category: 'Pizza',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-2-4',
        name: 'Garlic Knots',
        description: 'Freshly baked knots brushed with garlic butter and herbs',
        price: 4.99,
        category: 'Sides',
        isVegetarian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: 'vendor-3',
    name: 'Sushi Spot',
    description: 'Fresh sushi rolls, sashimi, and Japanese specialties.',
    image: '/sushi.jpg',
    rating: 4.7,
    cuisineType: 'Japanese',
    deliveryTime: '25-35 min',
    menu: [
      {
        id: 'item-3-1',
        name: 'California Roll',
        description: 'Crab, avocado, and cucumber roll with sesame seeds',
        price: 8.99,
        image: '/california-roll.jpg',
        category: 'Rolls',
        isVegetarian: false,
        isAvailable: true,
      },
      {
        id: 'item-3-2',
        name: 'Spicy Tuna Roll',
        description: 'Spicy tuna and cucumber roll with spicy mayo',
        price: 9.99,
        category: 'Rolls',
        isVegetarian: false,
        isAvailable: true,
      },
      {
        id: 'item-3-3',
        name: 'Vegetable Tempura',
        description: 'Assorted vegetables in a light, crispy batter with tempura sauce',
        price: 7.99,
        category: 'Appetizers',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-3-4',
        name: 'Miso Soup',
        description: 'Traditional Japanese soup with tofu, seaweed, and green onions',
        price: 3.99,
        category: 'Soup',
        isVegetarian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: 'vendor-4',
    name: 'Burrito Brothers',
    description: 'Authentic Mexican burritos, tacos, and bowls with fresh ingredients.',
    image: '/mexican.jpg',
    rating: 4.2,
    cuisineType: 'Mexican',
    deliveryTime: '15-25 min',
    menu: [
      {
        id: 'item-4-1',
        name: 'Chicken Burrito',
        description: 'Grilled chicken, rice, beans, cheese, pico de gallo, and sour cream in a flour tortilla',
        price: 9.99,
        image: '/chicken-burrito.jpg',
        category: 'Burritos',
        isVegetarian: false,
        isAvailable: true,
      },
      {
        id: 'item-4-2',
        name: 'Veggie Bowl',
        description: 'Rice, beans, grilled vegetables, guacamole, pico de gallo, and cheese',
        price: 8.99,
        category: 'Bowls',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-4-3',
        name: 'Street Tacos',
        description: 'Three corn tortillas with your choice of meat, onions, cilantro, and salsa',
        price: 7.99,
        category: 'Tacos',
        isVegetarian: false,
        isAvailable: true,
      },
      {
        id: 'item-4-4',
        name: 'Chips & Guacamole',
        description: 'Freshly made tortilla chips with house-made guacamole',
        price: 5.99,
        category: 'Sides',
        isVegetarian: true,
        isAvailable: true,
      },
    ],
  },
  {
    id: 'vendor-5',
    name: 'Green Bowl',
    description: 'Nutritious grain bowls, poke, and plant-based options.',
    image: '/bowls.jpg',
    rating: 4.6,
    cuisineType: 'Healthy/Bowls',
    deliveryTime: '15-25 min',
    menu: [
      {
        id: 'item-5-1',
        name: 'Salmon Poke Bowl',
        description: 'Brown rice, raw salmon, avocado, edamame, cucumber, seaweed, and ponzu sauce',
        price: 12.99,
        image: '/poke-bowl.jpg',
        category: 'Poke Bowls',
        isVegetarian: false,
        isAvailable: true,
      },
      {
        id: 'item-5-2',
        name: 'Buddha Bowl',
        description: 'Quinoa, roasted sweet potato, chickpeas, kale, tahini dressing, and pumpkin seeds',
        price: 10.99,
        category: 'Grain Bowls',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-5-3',
        name: 'Teriyaki Tofu Bowl',
        description: 'Brown rice, teriyaki glazed tofu, stir-fried vegetables, and sesame seeds',
        price: 9.99,
        category: 'Grain Bowls',
        isVegetarian: true,
        isAvailable: true,
      },
      {
        id: 'item-5-4',
        name: 'Matcha Smoothie',
        description: 'Matcha green tea, banana, spinach, almond milk, and honey',
        price: 6.49,
        category: 'Drinks',
        isVegetarian: true,
        isAvailable: true,
      },
    ],
  },
];

// Incident reports
const incidentReports: IncidentReport[] = [
  {
    id: 'incident-1',
    type: 'Maintenance',
    description: 'Broken chair in Science Center, Room 203, near the window.',
    location: 'Science Center, Room 203',
    dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 'resolved',
    urgency: 'low',
    anonymous: true,
  },
  {
    id: 'incident-2',
    type: 'Safety',
    description: 'Wet floor without caution sign near the main entrance of the Student Union.',
    location: 'Student Union, Main Entrance',
    dateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'resolved',
    urgency: 'medium',
    anonymous: false,
  },
  {
    id: 'incident-3',
    type: 'Technology',
    description: 'Projector in Engineering Building, Room 105 is not connecting to laptops.',
    location: 'Engineering Building, Room 105',
    dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'reviewing',
    urgency: 'medium',
    anonymous: true,
  },
  {
    id: 'incident-4',
    type: 'Security',
    description: 'Suspicious person loitering near the bike racks outside the library.',
    location: 'Main Library, Bike Racks',
    dateTime: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    status: 'pending',
    urgency: 'high',
    anonymous: true,
  },
  {
    id: 'incident-5',
    type: 'Other',
    description: 'Lost and found item (blue backpack) turned in to the Arts Center reception.',
    location: 'Arts Center, Reception',
    dateTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    status: 'resolved',
    urgency: 'low',
    anonymous: false,
  },
];

// Emergency alerts
const emergencyAlerts: EmergencyAlert[] = [
  {
    id: 'alert-1',
    title: 'Campus Power Outage',
    description: 'A power outage is affecting the north side of campus. Maintenance crews are working to restore power.',
    type: 'other',
    severity: 'warning',
    dateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    affectedAreas: ['Science Center', 'Engineering Building', 'North Residence Halls'],
    instructions: 'Classes in affected buildings are temporarily moved online. Check your email for specific instructions from your professors.',
  },
  {
    id: 'alert-2',
    title: 'Severe Weather Warning',
    description: 'The National Weather Service has issued a severe thunderstorm warning for our area from 3PM to 7PM today.',
    type: 'weather',
    severity: 'warning',
    dateTime: new Date(Date.now() - 0.1 * 24 * 60 * 60 * 1000).toISOString(), // 2.4 hours ago
    affectedAreas: ['Entire Campus'],
    instructions: 'Stay indoors if possible. All outdoor events are cancelled. Monitor campus alerts for updates.',
  },
];

// Library books
const generateBooks = (): LibraryBook[] => {
  const categories = ['Science', 'Mathematics', 'Computer Science', 'Literature', 'History', 'Psychology', 'Business', 'Art', 'Philosophy', 'Engineering'];
  const locations = ['Floor 1, Section A', 'Floor 1, Section B', 'Floor 2, Section A', 'Floor 2, Section B', 'Floor 3, Section A', 'Floor 3, Section B'];
  
  const books: LibraryBook[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const isAvailable = Math.random() > 0.3; // 70% chance of being available
    
    let dueDate;
    if (!isAvailable) {
      const now = new Date();
      now.setDate(now.getDate() + randomInt(1, 14)); // Due in 1-14 days
      dueDate = now.toISOString();
    }
    
    books.push({
      id: `book-${i}`,
      rfidTag: `RFID-${1000 + i}`,
      title: getBookTitle(category, i),
      author: getAuthorName(i),
      isbn: `978-${randomInt(1000000000, 9999999999)}`,
      category,
      location,
      isAvailable,
      dueDate,
      coverImage: `/book-${i % 10 + 1}.jpg`,
    });
  }
  
  return books;
};

// Helper functions for book generation
function getBookTitle(category: string, i: number): string {
  const scienceTitles = ['The Quantum Universe', 'Principles of Biology', 'Cosmos and Beyond', 'The Cell Structure', 'Evolution of Species'];
  const mathTitles = ['Calculus Fundamentals', 'Linear Algebra', 'Number Theory', 'Statistics in Practice', 'Geometry Principles'];
  const csTitles = ['Algorithms Explained', 'Data Structures', 'Machine Learning Basics', 'Python Programming', 'Web Development'];
  const literatureTitles = ['Modern Poetry', 'The Great American Novel', 'Shakespeare Analysis', 'World Literature', 'Literary Criticism'];
  const historyTitles = ['Ancient Civilizations', 'World War II', 'American History', 'The Renaissance', 'Medieval Europe'];
  
  switch (category) {
    case 'Science': return scienceTitles[i % scienceTitles.length] + ' Vol. ' + Math.ceil(i / scienceTitles.length);
    case 'Mathematics': return mathTitles[i % mathTitles.length] + ' Vol. ' + Math.ceil(i / mathTitles.length);
    case 'Computer Science': return csTitles[i % csTitles.length] + ' Vol. ' + Math.ceil(i / csTitles.length);
    case 'Literature': return literatureTitles[i % literatureTitles.length] + ' Vol. ' + Math.ceil(i / literatureTitles.length);
    case 'History': return historyTitles[i % historyTitles.length] + ' Vol. ' + Math.ceil(i / historyTitles.length);
    default: return `${category} Textbook ${i}`;
  }
}

function getAuthorName(i: number): string {
  const firstNames = ['James', 'Maria', 'John', 'Sara', 'David', 'Emma', 'Michael', 'Sofia', 'Robert', 'Olivia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  return `${firstNames[i % firstNames.length]} ${lastNames[Math.floor(i / firstNames.length) % lastNames.length]}`;
}

const books = generateBooks();

// Export mock data
export const mockData = {
  buildings,
  studyGroups,
  doubts,
  foodVendors,
  incidentReports,
  emergencyAlerts,
  books,
};
