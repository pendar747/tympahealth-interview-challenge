/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: "http://localhost:9000",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:9000/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
