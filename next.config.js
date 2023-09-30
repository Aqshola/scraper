/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["images.tokopedia.net", "down-id.img.susercontent.com"],
  },
});

module.exports = nextConfig;
