"use client";
import { SelfLocationMarker } from "./SelfLocationMarker";
import { Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { FunctionComponent, useCallback, useRef } from "react";
import { getCurrentLocation } from "@/utils/location";
import { applyLocation, setCurrentLocation, setMapDetail } from "@/stores/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import React from "react";
import ShopMarker from "./ShopMarker";

const RawLocationTrackingMap: FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    /**
     * 現在地情報
     */
    const { currentLocation, mapDetail, rangeMeter, mapPins } = useSelector(
        (state: RootState) => state.map,
    );
    /**
     * 初回レンダリングかどうか
     */
    const isFirstRender = useRef(true);

    /**
     * 1秒ごとに位置情報を取得する
     */
    // TODO: アップデートのたび全コンポーネントが再レンダリングされるのを防ぐ
    // TODO: 再レンダリングを防ぎつつ、定期的に位置情報を取得する
    // useInterval(() => {
    //     asyncGetLocation(false);
    // }, 1000);

    // TODO: useMemoを使用して、現在値の更新がない場合は画面更新を見送る
    /**
     * 現在地を取得し、初回レンダリングかどうかに応じてマップの状態を更新する
     * @param isFirst 初回レンダリングかどうか
     */
    const asyncGetLocation = async (isFirst: boolean) => {
        const current = await getCurrentLocation();

        if (current) {
            dispatch(setCurrentLocation(current));
            if (isFirst) {
                dispatch(applyLocation());
            }
        }
    };

    /**
     * マップがアイドル状態になったときの処理
     * @returns void
     */
    const handleIdleMap = () => {
        // 初回レンダリング時に位置情報を取得する
        if (!isFirstRender.current) return;
        isFirstRender.current = false;
        asyncGetLocation(true);
    };

    /**
     * マップカメラの変更時の処理
     */
    const handleCameraChange = useCallback(
        (ev: MapCameraChangedEvent) => {
            // カメラの変更時にmapStateを更新する
            dispatch(setMapDetail(ev.detail));
        },
        [dispatch],
    );

    return (
        <Map
            mapId="main-map"
            minZoom={10}
            maxZoom={20}
            gestureHandling="greedy"
            disableDefaultUI
            onCameraChanged={handleCameraChange}
            onIdle={handleIdleMap}
            clickableIcons={false}
            className="w-full h-full"
            center={mapDetail.center}
            zoom={mapDetail.zoom}
        >
            <SelfLocationMarker position={currentLocation} radius={rangeMeter} />
            {mapPins.map((pin) => (
                <ShopMarker position={{ lat: pin.lat, lng: pin.lng }} key={pin.shopId} />
            ))}
        </Map>
    );
};

export const LocationTrackingMap = RawLocationTrackingMap;
