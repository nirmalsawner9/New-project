import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, isRental: boolean = false): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedPrice = formatter.format(price);
  return isRental ? `${formattedPrice}/mo` : formattedPrice;
}

export function formatSquareFeet(sqft: number): string {
  return `${sqft.toLocaleString()} sq ft`;
}

export function formatLotSize(acres: number): string {
  if (acres >= 1) {
    return `${acres.toFixed(1)} acres`;
  }
  const sqft = Math.round(acres * 43560);
  return `${sqft.toLocaleString()} sq ft lot`;
}

export function getPropertyTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    house: 'House',
    condo: 'Condominium',
    townhouse: 'Townhouse',
    apartment: 'Apartment'
  };
  return typeLabels[type] || type;
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'for-sale': 'bg-green-100 text-green-800',
    'for-rent': 'bg-blue-100 text-blue-800',
    'sold': 'bg-gray-100 text-gray-800',
    'pending': 'bg-yellow-100 text-yellow-800'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    'for-sale': 'For Sale',
    'for-rent': 'For Rent',
    'sold': 'Sold',
    'pending': 'Pending'
  };
  return statusLabels[status] || status;
}