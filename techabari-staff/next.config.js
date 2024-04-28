/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['http://localhost:5000'], // Add your backend domain here
    },
    optimizeFonts: false,
  };
  
  module.exports = nextConfig;
  