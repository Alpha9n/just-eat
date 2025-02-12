import { exchangeRangeToMeter } from "@/utils/hotpepper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapCameraProps } from "@vis.gl/react-google-maps";

interface StorePin {
    lat: number;
    lng: number;
    infoWindow?: React.ReactNode;
    shopId: string;
}

interface MapState {
    mapDetail: MapCameraProps;
    currentLocation: google.maps.LatLngLiteral | null;
    range: 1 | 2 | 3 | 4 | 5;
    rangeMeter: number;
    mapPins: StorePin[];
}

export const initialMapState: MapState = {
    mapDetail: {
        center: { lat: 35.6813, lng: 139.767066 },
        zoom: 16,
    },
    currentLocation: null,
    range: 1,
    rangeMeter: 300,
    mapPins: [],
};

const mapSlice = createSlice({
    name: "map",
    initialState: initialMapState,
    reducers: {
        setCenter: (state, action: PayloadAction<google.maps.LatLngLiteral>) => {
            state.mapDetail.center = action.payload;
        },
        setZoom: (state, action: PayloadAction<number>) => {
            state.mapDetail.zoom = action.payload;
        },
        setMapDetail: (state, action: PayloadAction<MapCameraProps>) => {
            state.mapDetail = action.payload;
        },
        setRange: (state, action: PayloadAction<1 | 2 | 3 | 4 | 5>) => {
            state.range = action.payload;
            state.rangeMeter = exchangeRangeToMeter(action.payload);
        },
        setCurrentLocation: (state, action: PayloadAction<google.maps.LatLngLiteral | null>) => {
            state.currentLocation = action.payload;
        },
        applyLocation: (state) => {
            if (state.currentLocation !== null) {
                state.mapDetail.center = state.currentLocation;
                state.mapDetail.zoom = initialMapState.mapDetail.zoom;
            }
        },
        addMapPin: (state, action: PayloadAction<StorePin>) => {
            state.mapPins.push(action.payload);
        },
        removeMapPin: (state, action: PayloadAction<string>) => {
            state.mapPins = state.mapPins.filter((pin) => pin.shopId !== action.payload);
        },
        removeAllMapPin: (state) => {
            state.mapPins = [];
        },
    },
});

export const {
    setCenter,
    setZoom,
    setRange,
    setCurrentLocation,
    applyLocation,
    setMapDetail,
    addMapPin,
    removeMapPin,
    removeAllMapPin,
} = mapSlice.actions;
export default mapSlice.reducer;
