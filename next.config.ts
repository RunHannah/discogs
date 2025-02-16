import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.discogs.com", // Match this for image URLs
        port: "",
        pathname: "/**", // Match all paths
      },
      {
        protocol: "https",
        hostname: "st.discogs.com", // Match this for GIFs or other images
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
