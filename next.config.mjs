/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aigirlfriendblog.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      {
        source: '/pages/:slug*',
        destination: '/reviews/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;  
