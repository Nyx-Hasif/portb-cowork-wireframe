/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'images.unsplash.com', // ✅ Free Unsplash
        port: "",
        pathname: "/**",
      },
      // 👇 Tambah baris ini
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',   // ✅ Premium Unsplash
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;