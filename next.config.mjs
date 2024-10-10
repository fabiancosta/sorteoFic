/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
        port: '',
        pathname: '/**/flat/64.png'
      }
    ]
  },
  output: 'standalone'
}

export default nextConfig
