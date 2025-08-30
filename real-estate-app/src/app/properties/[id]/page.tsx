import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { properties } from '@/data/properties';
import { formatPrice, formatSquareFeet, formatLotSize, getPropertyTypeLabel, getStatusColor, getStatusLabel } from '@/lib/utils';

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    notFound();
  }

  const isRental = property.status === 'for-rent';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Images */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            <div className="relative">
              <Image
                src={property.images[0] || '/images/placeholder-property.jpg'}
                alt={property.title}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}>
                  {getStatusLabel(property.status)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((image, index) => (
                <Image
                  key={index}
                  src={image || '/images/placeholder-property.jpg'}
                  alt={`${property.title} - Image ${index + 2}`}
                  width={300}
                  height={200}
                  className="w-full h-44 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {getPropertyTypeLabel(property.type)} • Built in {property.details.yearBuilt}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(property.price, isRental)}
                    </div>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.details.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.details.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.details.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {property.details.lotSize ? formatLotSize(property.details.lotSize) : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Lot Size</div>
                  </div>
                </div>

                {/* Description */}
                <div className="py-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Features */}
                <div className="py-6 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Contact */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Agent</h3>
                <div className="flex items-center mb-4">
                  <Image
                    src={property.agent.image || '/images/placeholder-agent.jpg'}
                    alt={property.agent.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{property.agent.name}</h4>
                    <p className="text-sm text-gray-600">Real Estate Agent</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call {property.agent.phone}
                  </a>
                  
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center w-full border border-blue-600 text-blue-600 px-4 py-3 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email Agent
                  </a>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">{getPropertyTypeLabel(property.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built:</span>
                    <span className="font-medium">{property.details.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Square Footage:</span>
                    <span className="font-medium">{formatSquareFeet(property.details.sqft)}</span>
                  </div>
                  {property.details.lotSize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lot Size:</span>
                      <span className="font-medium">{formatLotSize(property.details.lotSize)}</span>
                    </div>
                  )}
                  {property.details.garageSpaces && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Garage:</span>
                      <span className="font-medium">{property.details.garageSpaces} spaces</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {getStatusLabel(property.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Properties */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Properties
          </Link>
        </div>
      </section>
    </div>
  );
}