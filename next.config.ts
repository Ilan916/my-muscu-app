import withPWA from 'next-pwa';

// Configuration PWA
const pwaConfig = {
  dest: 'public', // Destination des fichiers générés par next-pwa
  disable: process.env.NODE_ENV === 'development', 
};

// Configuration globale Next.js
const nextConfig = {
  reactStrictMode: true, // Mode strict pour React
  swcMinify: true, // Minification avec SWC
};

// Fusion des deux configurations
export default withPWA(pwaConfig)(nextConfig);
