/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // Real GitHub profile pictures come from here
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google Login profile pictures
      },
    ],
  },
};

export default nextConfig;