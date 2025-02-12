import { AdvancedMarker } from "@vis.gl/react-google-maps";

const ShopMarker = ({ position }: { position: google.maps.LatLngLiteral }) => {
    return <AdvancedMarker position={position}></AdvancedMarker>;
};

export default ShopMarker;
