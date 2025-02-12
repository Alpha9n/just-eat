import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/providers";
import React from "react";

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
        </html>
    );
};

export default RootLayout;
