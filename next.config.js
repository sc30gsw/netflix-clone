/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '*.io' },
      { protocol: 'https', hostname: '**.**.org' },
    ],
  },
}

module.exports = nextConfig
