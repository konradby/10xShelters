/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Ignoruj atrybut cz-shortcut-listen podczas hydratacji
    suppressHydrationWarnings: true,
  },
};

module.exports = nextConfig;
