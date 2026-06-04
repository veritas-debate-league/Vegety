/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Don't let the browser's client-side Router Cache serve stale pages on
  // back-navigation (e.g. Home -> Menu). With staleTimes at 0, every navigation
  // refetches from the server, so menu edits show without a hard refresh.
  experimental: {
    staleTimes: { dynamic: 0, static: 0 },
  },
};

export default nextConfig;
