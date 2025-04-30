import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
  },
  output: 'standalone',
};

// Wrap the config once with `withPayload`
export default withPayload(nextConfig);
