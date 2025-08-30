import { Property, Agent } from '@/types';

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@dreamhome.com',
    phone: '(555) 123-4567',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face',
    bio: 'With over 10 years of experience in luxury real estate, Sarah specializes in helping clients find their perfect home.',
    specialties: ['Luxury Homes', 'Waterfront Properties', 'Investment Properties'],
    experience: 10,
    properties: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@dreamhome.com',
    phone: '(555) 234-5678',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Michael is a dedicated real estate professional with expertise in urban properties and first-time home buyers.',
    specialties: ['Urban Properties', 'First-Time Buyers', 'Condominiums'],
    experience: 7,
    properties: ['4', '5', '6']
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@dreamhome.com',
    phone: '(555) 345-6789',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: 'Emily brings a fresh perspective to real estate with her background in architecture and interior design.',
    specialties: ['Modern Homes', 'Architectural Properties', 'Renovated Homes'],
    experience: 5,
    properties: ['7', '8']
  }
];

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Waterfront Villa',
    description: 'Stunning waterfront villa with panoramic ocean views, private beach access, and world-class amenities. This architectural masterpiece features floor-to-ceiling windows, gourmet kitchen, and infinity pool.',
    price: 2850000,
    location: {
      address: '123 Ocean Drive',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      coordinates: { lat: 34.0259, lng: -118.7798 }
    },
    details: {
      bedrooms: 5,
      bathrooms: 6,
      sqft: 4500,
      yearBuilt: 2019,
      lotSize: 1.2,
      garageSpaces: 3
    },
    features: [
      'Ocean Views',
      'Private Beach Access',
      'Infinity Pool',
      'Gourmet Kitchen',
      'Wine Cellar',
      'Home Theater',
      'Smart Home System',
      'Guest House'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    type: 'house',
    status: 'for-sale',
    agent: agents[0],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    title: 'Modern Downtown Penthouse',
    description: 'Sophisticated penthouse in the heart of downtown with breathtaking city skyline views. Features contemporary design, premium finishes, and access to building amenities.',
    price: 1650000,
    location: {
      address: '456 Metropolitan Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90012',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    details: {
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2800,
      yearBuilt: 2021,
      garageSpaces: 2
    },
    features: [
      'City Views',
      'Rooftop Terrace',
      'Concierge Service',
      'Fitness Center',
      'Pool & Spa',
      'High-End Appliances',
      'Floor-to-Ceiling Windows',
      'Private Elevator'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560449752-6cf6d3b3b44f?w=800&h=600&fit=crop'
    ],
    type: 'condo',
    status: 'for-sale',
    agent: agents[0],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T14:15:00Z'
  },
  {
    id: '3',
    title: 'Charming Family Home',
    description: 'Beautiful family home in a quiet neighborhood with excellent schools. Features spacious rooms, updated kitchen, and large backyard perfect for entertaining.',
    price: 875000,
    location: {
      address: '789 Maple Street',
      city: 'Pasadena',
      state: 'CA',
      zipCode: '91101',
      coordinates: { lat: 34.1478, lng: -118.1445 }
    },
    details: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      yearBuilt: 2005,
      lotSize: 0.25,
      garageSpaces: 2
    },
    features: [
      'Updated Kitchen',
      'Hardwood Floors',
      'Large Backyard',
      'Two-Car Garage',
      'Central Air',
      'Fireplace',
      'Walk-in Closets',
      'Laundry Room'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop'
    ],
    type: 'house',
    status: 'for-sale',
    agent: agents[0],
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  },
  {
    id: '4',
    title: 'Urban Loft Apartment',
    description: 'Stylish loft apartment in trendy arts district. Exposed brick walls, high ceilings, and industrial-chic design. Walking distance to galleries, restaurants, and nightlife.',
    price: 3200,
    location: {
      address: '321 Arts District Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90013',
      coordinates: { lat: 34.0407, lng: -118.2468 }
    },
    details: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      yearBuilt: 1920,
      garageSpaces: 1
    },
    features: [
      'Exposed Brick',
      'High Ceilings',
      'Industrial Design',
      'In-Unit Laundry',
      'Modern Kitchen',
      'Rooftop Access',
      'Pet Friendly',
      'Bike Storage'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop'
    ],
    type: 'apartment',
    status: 'for-rent',
    agent: agents[1],
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-17T10:30:00Z'
  },
  {
    id: '5',
    title: 'Cozy Studio Downtown',
    description: 'Efficient studio apartment perfect for young professionals. Modern amenities, great location, and affordable rent in the heart of the city.',
    price: 1800,
    location: {
      address: '654 Spring Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90014',
      coordinates: { lat: 34.0522, lng: -118.2500 }
    },
    details: {
      bedrooms: 0,
      bathrooms: 1,
      sqft: 650,
      yearBuilt: 2018,
      garageSpaces: 0
    },
    features: [
      'Murphy Bed',
      'Modern Kitchen',
      'In-Unit Laundry',
      'Gym Access',
      'Rooftop Lounge',
      'Concierge',
      'Pet Friendly',
      'High-Speed Internet'
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop'
    ],
    type: 'apartment',
    status: 'for-rent',
    agent: agents[1],
    createdAt: '2024-01-14T08:45:00Z',
    updatedAt: '2024-01-21T12:00:00Z'
  },
  {
    id: '6',
    title: 'Elegant Townhouse',
    description: 'Sophisticated townhouse with contemporary design and premium finishes. Features private patio, attached garage, and access to community amenities.',
    price: 1250000,
    location: {
      address: '987 Willow Lane',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      coordinates: { lat: 34.0736, lng: -118.4004 }
    },
    details: {
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2000,
      yearBuilt: 2020,
      garageSpaces: 2
    },
    features: [
      'Private Patio',
      'Attached Garage',
      'Granite Countertops',
      'Stainless Steel Appliances',
      'Walk-in Closets',
      'Community Pool',
      'Security System',
      'Energy Efficient'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop'
    ],
    type: 'townhouse',
    status: 'for-sale',
    agent: agents[1],
    createdAt: '2024-01-09T13:15:00Z',
    updatedAt: '2024-01-16T09:20:00Z'
  },
  {
    id: '7',
    title: 'Architectural Marvel',
    description: 'Award-winning contemporary home designed by renowned architect. Features sustainable materials, innovative design, and seamless indoor-outdoor living.',
    price: 3200000,
    location: {
      address: '159 Sunset Boulevard',
      city: 'West Hollywood',
      state: 'CA',
      zipCode: '90069',
      coordinates: { lat: 34.0901, lng: -118.3896 }
    },
    details: {
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3800,
      yearBuilt: 2022,
      lotSize: 0.4,
      garageSpaces: 3
    },
    features: [
      'Award-Winning Design',
      'Sustainable Materials',
      'Solar Panels',
      'Smart Home Technology',
      'Outdoor Kitchen',
      'Infinity Pool',
      'Home Office',
      'Art Studio'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753051-6057c0e1e6f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752229-450ded7eaa4f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    type: 'house',
    status: 'for-sale',
    agent: agents[2],
    createdAt: '2024-01-05T16:30:00Z',
    updatedAt: '2024-01-22T11:45:00Z'
  },
  {
    id: '8',
    title: 'Renovated Victorian',
    description: 'Beautifully renovated Victorian home blending historic charm with modern conveniences. Features original hardwood floors, updated systems, and period details.',
    price: 1450000,
    location: {
      address: '246 Heritage Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94117',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    details: {
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2600,
      yearBuilt: 1895,
      lotSize: 0.15,
      garageSpaces: 1
    },
    features: [
      'Historic Character',
      'Original Hardwood',
      'Updated Kitchen',
      'Period Details',
      'Bay Windows',
      'Garden',
      'Clawfoot Tub',
      'Crown Molding'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop'
    ],
    type: 'house',
    status: 'for-sale',
    agent: agents[2],
    createdAt: '2024-01-07T12:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  }
];

export const featuredProperties = properties.slice(0, 3);
export const recentProperties = properties.slice(3, 6);