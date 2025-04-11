# AgriWaste Market - B2B Agricultural Waste Marketplace

A React-based web application for connecting agricultural waste producers with businesses that can transform waste into value. The platform serves as an e-commerce marketplace where sellers can list their agricultural waste products and buyers can purchase them.

## Features

- **Marketplace Listings**: Browse and search through various agricultural waste products
- **Product Categories**: Filter products by category (Biomass, Compost, Animal Feed, Fertilizers)
- **Product Details**: View detailed information about each product, including specifications and seller info
- **User Authentication**: Register and login functionality for buyers and sellers
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack

- React with TypeScript
- React Router for navigation
- Material UI for component styling
- Responsive design with mobile-first approach

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/your-username/agriculture-marketplace.git
cd agriculture-marketplace
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
agriculture-marketplace/
├── src/
│   ├── assets/           # Static assets (images, etc.)
│   ├── components/       # Reusable components
│   ├── context/          # React context for state management
│   ├── pages/            # Page components
│   ├── services/         # API services and utilities
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Entry point
├── public/               # Public assets
└── package.json          # Dependencies and scripts
```

## Customization

### Theme

The application uses a light green theme that can be customized in `src/App.tsx`. The main color palette is defined in the Material UI theme.

### Background Watermark

The background watermark can be replaced by adding your preferred agricultural waste image to `src/assets/images/agriwaste-watermark.png`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Agricultural waste images from Unsplash
- Icons from Material UI 