/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old dispensary-era engine pages and results now live in the case study.
      { source: "/engines/:slug", destination: "/proof", permanent: true },
      { source: "/results", destination: "/proof", permanent: true },
    ];
  },
};

export default nextConfig;
