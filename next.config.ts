import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  // Include outstatic content files in the serverless function bundle so
  // pages can re-read them during ISR revalidation on Vercel.
  outputFileTracingIncludes: {
    "/surgeries/[slug]": ["./outstatic/content/**/*"],
    "/specialities/[slug]": ["./outstatic/content/**/*"],
    "/": ["./outstatic/content/**/*"],
  },
};

export default nextConfig;
