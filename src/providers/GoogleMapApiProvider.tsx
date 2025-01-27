'use client';
import { APIProvider } from "@vis.gl/react-google-maps";

interface GoogleMapApiProvidersProps {
    children: React.ReactNode;
}

const GoogleMapApiProvider = ({ children }: GoogleMapApiProvidersProps) => {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY?? ''}>
            {children}
        </APIProvider>
    );
}

export default GoogleMapApiProvider;