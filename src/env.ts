import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        HOT_PEPPER_API_URL: z.string(),
        HOT_PEPPER_API_KEY: z.string(),
    },
    client: {
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
    },
    runtimeEnv: {
        HOT_PEPPER_API_URL: process.env.HOT_PEPPER_API_URL,
        HOT_PEPPER_API_KEY: process.env.HOT_PEPPER_API_KEY,
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    },
});
