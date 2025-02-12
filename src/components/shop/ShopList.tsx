"use client";
import { AppDispatch, RootState } from "@/stores";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { changeView, selectShop, setPage, setShops } from "@/stores/drawerSlice";
import { Badge } from "../ui/badge";
import { CircleAlert } from "lucide-react";
import { findAll } from "./action";
import Pager from "../Pager";

const getStartIndex = (currentPage: number, count: number): number => {
    return count * (currentPage - 1) + 1;
};

/**
 * コンポーネントのプロパティ
 * @param {ShopListProps} props
 * @returns
 */
const ShopList: FunctionComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { resultCount, shops, page, shopsSearchOptions } = useSelector(
        (state: RootState) => state.drawer,
    );

    const pageCount = Math.ceil(resultCount / shopsSearchOptions.count);

    const fetchShops = async (currentPage: number) => {
        if (!shopsSearchOptions.lat || !shopsSearchOptions.lng || !shopsSearchOptions.range) return;
        const start = getStartIndex(currentPage, shopsSearchOptions.count);

        const fetchedShops = await findAll(
            shopsSearchOptions.range,
            { lat: shopsSearchOptions.lat, lng: shopsSearchOptions.lng },
            { ...shopsSearchOptions, start },
        );

        dispatch(setShops(fetchedShops));
    };

    const handlePageClick = (p: number): void => {
        if (p === page || p < 1 || pageCount < p) return;
        dispatch(setPage(p));
        fetchShops(p);
    };

    const handleShopClick = (shopId: string): void => {
        dispatch(selectShop(shopId));
        dispatch(changeView("detail"));
    };

    if (shops.length <= 0) {
        return (
            <div className="text-center w-full h-full flex flex-col items-center justify-center gap-5 py-10">
                <CircleAlert className="size-12 text-red-500" />
                <p className="text-lg font-bold">検索結果が見つかりませんでした。</p>
                <p className="text-sm">
                    検索条件・範囲を変更するか
                    <br />
                    再度検索ボタンを押してください
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                {shops.map((shop) => (
                    <Card
                        key={shop.id}
                        className="flex flex-col justify-between"
                        onClick={() => handleShopClick(shop.id)}
                    >
                        <div className="flex justify-between items-center p-5 w-full h-2/4">
                            <CardHeader className="w-3/4">
                                <CardTitle>{shop.name}</CardTitle>
                            </CardHeader>
                            <div className="flex justify-center items-center w-1/4 h-full rounded-md border-neutral-600 dark:border-neutral-100 shadow-md border-2">
                                <Image
                                    src={shop.photo.pc.l}
                                    width={500}
                                    height={500}
                                    alt={shop.name}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                        <CardContent className="flex flex-col gap-1">
                            <p>{shop.catch}</p>
                            <p className="text-sm">{shop.address}</p>
                            <Badge variant="default" className="w-fit">
                                {shop.genre.name}
                            </Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pager
                pageCount={pageCount}
                currentPage={page}
                resultCount={resultCount}
                handlePageClick={handlePageClick}
            />
        </div>
    );
};

export default ShopList;
