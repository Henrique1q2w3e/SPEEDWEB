import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allows testing the dev server from a phone on the same Wi-Fi network.
  allowedDevOrigins: ["192.168.1.101"],
};

export default nextConfig;
