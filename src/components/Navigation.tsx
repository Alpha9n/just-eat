"use client";
import { Filter, Locate, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { findAll } from "./shop/action";
import {
    resetState,
    setCurrentSearchLocation,
    setCurrentSearchRange,
    setShops,
    setSnapPoint,
} from "@/stores/drawerSlice";
import { applyLocation } from "@/stores/mapSlice";
import React from "react";

const Navigation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const map = useSelector((state: RootState) => state.map);
    /**
     * 検索ボタンをクリックしたときの処理
     */
    const handleSearchButton = async () => {
        const result = await findAll(map.range, map.mapDetail.center);
        // 状態をリセット
        dispatch(resetState());

        // 検索条件の保存
        dispatch(setCurrentSearchLocation(map.mapDetail.center));
        dispatch(setCurrentSearchRange(map.range));

        // 結果の表示
        dispatch(setSnapPoint("full"));
        dispatch(setShops(result));
    };

    /**
     * 現在地ボタンをクリックしたときの処理
     */
    const handleLocateButton = () => {
        dispatch(applyLocation());
    };

    return (
        <>
            <div className="flex gap-0">
                <Button className="h-11 rounded-r-none border border-neutral-700" disabled>
                    <Filter />
                    条件選択
                </Button>
                <Button size="icon" className="size-11 rounded-l-none" onClick={handleSearchButton}>
                    <Search />
                </Button>
            </div>
            <Button size="icon" className="size-11 ml-3" onClick={handleLocateButton}>
                <Locate />
            </Button>
        </>
    );
};

export default React.memo(Navigation);
