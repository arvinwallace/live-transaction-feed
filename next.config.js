/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COIN_GECKO: process.env.COIN_GECKO,
    WEB3_KEY: process.env.WEB3_KEY
  },
}

module.exports = nextConfig
