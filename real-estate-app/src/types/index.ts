export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    yearBuilt: number;
    lotSize?: number;
    garageSpaces?: number;
  };
  features: string[];
  images: string[];
  type: 'house' | 'condo' | 'townhouse' | 'apartment';
  status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
  agent: {
    name: string;
    email: string;
    phone: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: Property['type'];
  location?: string;
  minSqft?: number;
  maxSqft?: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  specialties: string[];
  experience: number;
  properties: string[];
}