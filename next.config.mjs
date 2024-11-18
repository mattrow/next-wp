/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_HOSTNAME,
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
