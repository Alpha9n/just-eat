"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { findOne } from "./action";
import React from "react";
import { Button } from "../ui/button";
import { MapPin, Route } from "lucide-react";
import Link from "next/link";
import { addMapPin, removeAllMapPin, setCenter, setZoom } from "@/stores/mapSlice";
import { AppDispatch } from "@/stores";
import { useDispatch } from "react-redux";
import { setSnapPoint } from "@/stores/drawerSlice";
import Loading from "@/app/loading";

type Shop = Awaited<ReturnType<typeof findOne>>;

interface ShopDetailProps {
    shopId: string | null;
}

const ShopDetailNotAvailable = () => {
    return (
        <div className="text-center w-full h-full flex flex-col items-center justify-center gap-5">
            <Loading />
        </div>
    );
};

const ShopDetail = ({ shopId }: ShopDetailProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [shop, setShop] = useState<Shop | null>(null);

    useEffect(() => {
        if (!shopId) {
            return;
        }
        const fetchShop = async () => {
            let fetchedShop: Shop | null = null;
            try {
                fetchedShop = await findOne(shopId);
            } catch (e: unknown) {
                console.error(e);
                return;
            }
            setShop(fetchedShop);
        };
        fetchShop();
    }, [shopId]);

    if (!shop) {
        return <ShopDetailNotAvailable />;
    }

    const handleShopLocationButton = () => {
        if (!shop) return;
        // 全ての店舗のマップピンを削除
        dispatch(removeAllMapPin());

        // mapにフォーカスを合わせるためにsnapPointをnormalに変更
        dispatch(setSnapPoint("normal"));
        // 選択した店舗のマップピンを追加
        dispatch(addMapPin({ shopId: shop.id, lat: shop.lat, lng: shop.lng }));
        dispatch(setCenter({ lat: shop.lat, lng: shop.lng }));
        dispatch(setZoom(18));
    };

    return (
        <div className="h-full flex flex-col p-3 gap-5 bg-white rounded-md">
            <div className="h-full flex flex-col gap-3">
                <p className="text-sm">{shop.catch}</p>
                <h1 className="scroll-m-20 pb-2 text-xl font-bold">{shop.name}</h1>
                <div className="flex justify-between items-center gap-2">
                    <p className="text-sm">{shop.genre.name}</p>
                    <div className="flex gap-2">
                        <Button size="icon" variant="outline" onClick={handleShopLocationButton}>
                            <MapPin />
                        </Button>
                        <Button asChild>
                            <Link target="_blank" href={shop.urls.pc}>
                                掲載ページ
                            </Link>
                        </Button>
                    </div>
                </div>
                <Image
                    src={shop.photo.pc.l}
                    width={700}
                    height={500}
                    alt={shop.name}
                    className="object-contain h-2/4 w-full bg-gray-100 rounded-sm"
                />
            </div>
            <div className="flex flex-col gap-3">
                <Button asChild variant="outline" size="sm">
                    <Link
                        href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`}
                        target="_blank"
                    >
                        <Route />
                        GoogleMapで経路を確認
                    </Link>
                </Button>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">営業時間</h2>
                    <p>{shop.open}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">アクセス</h2>
                    <p>{shop.access}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">住所</h2>
                    <p className="break-words">{shop.address}</p>
                </div>
            </div>
        </div>
    );
};

export { ShopDetailNotAvailable };
export default React.memo(ShopDetail);
