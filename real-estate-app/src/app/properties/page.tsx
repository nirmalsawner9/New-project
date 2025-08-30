'use client';

import { useState, useMemo } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertySearch from '@/components/PropertySearch';
import { properties } from '@/data/properties';
import { SearchFilters } from '@/types';

export default function PropertiesPage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest' | 'sqft'>('newest');

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      // Filter by price range
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      
      // Filter by bedrooms
      if (filters.bedrooms && property.details.bedrooms < filters.bedrooms) return false;
      
      // Filter by bathrooms
      if (filters.bathrooms && property.details.bathrooms < filters.bathrooms) return false;
      
      // Filter by property type
      if (filters.propertyType && property.type !== filters.propertyType) return false;
      
      // Filter by location (simple text search)
      if (filters.location) {
        const locationText = `${property.location.address} ${property.location.city} ${property.location.state} ${property.location.zipCode}`.toLowerCase();
        if (!locationText.includes(filters.location.toLowerCase())) return false;
      }
      
      // Filter by square footage
      if (filters.minSqft && property.details.sqft < filters.minSqft) return false;
      if (filters.maxSqft && property.details.sqft > filters.maxSqft) return false;
      
      return true;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'sqft':
          return b.details.sqft - a.details.sqft;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties</h1>
          <p className="text-gray-600">
            Discover your perfect home from our extensive collection of premium properties.
          </p>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertySearch onSearch={handleSearch} />
        </div>
      </section>

      {/* Results and Sorting */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredAndSortedProperties.length}</span> properties
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price-low' | 'price-high' | 'newest' | 'sqft')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="sqft">Square Footage</option>
              </select>
            </div>
          </div>

          {/* Property Grid */}
          {filteredAndSortedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria to find more properties.
              </p>
              <button
                onClick={() => setFilters({})}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}