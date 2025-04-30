// Remove the import statement for NextConfig
// import { NextConfig } from 'next';

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
  },
  output: 'standalone',
};

export default nextConfig;