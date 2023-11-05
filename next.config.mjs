/** @type {import('next').NextConfig} */
import PWA from "next-pwa";
import withPlugins from "next-compose-plugins";

const withPWA = PWA({
  dest: "public",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.tokopedia.net",
      "down-id.img.susercontent.com",
      "www.static-src.com",
    ],
  },
  output: "standalone",
};

export default withPlugins([withPWA], nextConfig);
