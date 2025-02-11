import { logger } from "@/utils/logger";
import { AdvancedMarker, GoogleMapsContext, latLngEquals } from "@vis.gl/react-google-maps";
import { useContext, useEffect, useImperativeHandle, useRef } from "react";

type Position = google.maps.LatLng | google.maps.LatLngLiteral | null | undefined;

interface SelfLocationMarkerProps {
    position: Position;
    radius?: number;
}

interface CircleAreaProps {
    radius?: number;
    center: Position;
}

/**
 * 範囲を示す円(メートル単位)を描画する
 */
const CircleArea = ({ radius, center }: CircleAreaProps) => {
    const callbacks = useRef<Record<string, (e: unknown) => void>>({});
    const circle = useRef(new google.maps.Circle()).current;
    const map = useContext(GoogleMapsContext)?.map;

    useEffect(() => {
        if (!center) return;
        if (!latLngEquals(center, circle.getCenter())) circle.setCenter(center);
    }, [center]);

    useEffect(() => {
        if (radius === undefined || radius === null) return;
        if (radius !== circle.getRadius()) circle.setRadius(radius);
    }, [radius]);

    useEffect(() => {
        if (!map) {
            if (map === undefined)
                logger('error', '<Circle> はMapコンポーネント内にある必要があります。', { calledBy: 'SelfLocationMarker#CircleArea()', statusCode: ''});

            return;
        }

        circle.setMap(map);

        return () => {
            circle.setMap(null);
        };
    }, [map]);

    useEffect(() => {
        const event = google.maps.event;

        event.addListener(circle, 'center_changed', () => {
            const newCenter = circle.getCenter();
            callbacks.current.onCenterChanged?.(newCenter);
        });

        return () => {
            event.clearInstanceListeners(circle);
        };
    }, [circle]);

    useImperativeHandle(this, () => {
        return circle;
    });
    return null;
};

/**
 * 現在地を示すマーカー
 */
const SelfLocationMarker = ({ position, radius }: SelfLocationMarkerProps) => {
    return (
        <>
            <AdvancedMarker position={position} anchorPoint={['50%', '50%']}>
                <div className="w-5 h-5 bg-blue-500 rounded-full border-2" />
            </AdvancedMarker>
            {radius && (<CircleArea radius={radius} center={position} />)}
        </>
    );
};

export default SelfLocationMarker;
