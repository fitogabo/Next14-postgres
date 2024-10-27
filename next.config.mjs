import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // Permite imágenes de Google
  },
  reactStrictMode: true, // Habilita el modo estricto de React
  swcMinify: true, // Habilita la minificación con SWC
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: path.resolve(__dirname, 'node_modules/punycode')
    };
    return config;
  },
};

export default nextConfig;