import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "imgfp.hotp.jp",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
