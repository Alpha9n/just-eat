"use client";
import GoogleMapApiProvider from "@/components/providers/GoogleMapApiProvider";
import { store } from "@/stores";
import React from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
    children: React.ReactNode;
}

// Provider統合コンポーネント
const Providers = ({ children }: ProvidersProps) => {
    return (
        <GoogleMapApiProvider>
            <Provider store={store}>{children}</Provider>
        </GoogleMapApiProvider>
    );
};

export default Providers;
