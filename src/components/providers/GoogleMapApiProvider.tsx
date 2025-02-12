"use client";
import { env } from "@/env";
import { APIProvider } from "@vis.gl/react-google-maps";

interface GoogleMapApiProvidersProps {
    children: React.ReactNode;
}

const GoogleMapApiProvider = ({ children }: GoogleMapApiProvidersProps) => {
    return <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>{children}</APIProvider>;
};

export default GoogleMapApiProvider;
