import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/providers";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "@/env";

export const metadata: Metadata = {
    title: {
        template: "JustEat | %s",
        default: "JustEat",
    },
    description: "食べたい時にサクッと",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="ja">
            <body className="antialiased w-svw h-svh">
                <Providers>{children}</Providers>
            </body>
            <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        </html>
    );
};

export default RootLayout;
