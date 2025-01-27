import { AdvancedMarker } from "@vis.gl/react-google-maps";

const SelfLocationMarker = (
    { position }: { position: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined }
) => {
    return (
        <AdvancedMarker position={position}>
            <div className="w-5 h-5 bg-blue-500 rounded-full border-2 " />
        </AdvancedMarker>
    );
};

export default SelfLocationMarker;