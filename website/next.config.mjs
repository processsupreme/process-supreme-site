/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Static pitch pages living in public/<slug>/index.html.
      { source: "/underdog", destination: "/underdog/index.html" },
    ];
  },
  async redirects() {
    return [
      // Old dispensary-era engine pages and results now live in the case study.
      { source: "/engines/:slug", destination: "/proof", permanent: true },
      { source: "/results", destination: "/proof", permanent: true },
    ];
  },
};

export default nextConfig;
