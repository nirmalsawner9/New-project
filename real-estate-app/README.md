# DreamHome - Real Estate Application

A modern, responsive real estate application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Property Listings**: Browse and search through luxury properties
- 🔍 **Advanced Search**: Filter by price, location, bedrooms, bathrooms, and property type
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 👥 **Agent Profiles**: Meet our team of real estate professionals
- 🏘️ **Property Details**: Comprehensive property information with image galleries
- 📊 **Property Stats**: Detailed metrics and features for each listing

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Images**: Unsplash (placeholder images)
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── agents/            # Agents listing page
│   ├── contact/           # Contact page
│   ├── properties/        # Properties listing and detail pages
│   │   └── [id]/         # Dynamic property detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── Footer.tsx         # Site footer
│   ├── LoadingSpinner.tsx # Loading component
│   ├── Navigation.tsx     # Site navigation
│   ├── PropertyCard.tsx   # Property card component
│   └── PropertySearch.tsx # Search form component
├── data/                  # Mock data
│   └── properties.ts      # Property and agent data
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript definitions
    └── index.ts           # Type definitions
```

## Pages

- **Homepage** (`/`): Hero section, property search, featured properties, and company stats
- **Properties** (`/properties`): Full property listings with search and filtering
- **Property Details** (`/properties/[id]`): Individual property pages with detailed information
- **Agents** (`/agents`): Team member profiles and contact information
- **About** (`/about`): Company information and values
- **Contact** (`/contact`): Contact form and office information

## Key Components

### PropertyCard
Displays property information in a card format with:
- Property image with status badge
- Price and basic details
- Location information
- Agent contact info

### PropertySearch
Advanced search form with filters for:
- Location search
- Property type selection
- Price range
- Bedroom/bathroom count

### Navigation
Responsive navigation with:
- Logo and brand name
- Desktop menu
- Mobile hamburger menu
- Call-to-action button

## Customization

### Adding New Properties
Edit `src/data/properties.ts` to add new property listings. Each property should follow the `Property` interface defined in `src/types/index.ts`.

### Styling
The application uses Tailwind CSS for styling. Custom styles can be added to `src/app/globals.css`.

### Images
Property images are currently sourced from Unsplash. For production, replace with actual property photos.

## Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Deploy on Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## License

This project is for educational and demonstration purposes.