/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@vaanjay/ui', '@vaanjay/types'],
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
