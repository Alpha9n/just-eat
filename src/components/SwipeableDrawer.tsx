"use client";
import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "./ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import ShopDetail from "./shop/ShopDetail";
import ShopList from "./shop/ShopList";
import React from "react";
import { Button } from "./ui/button";
import { changeView, setSnapPoint, setSnapPointByRaw, snapPoints } from "@/stores/drawerSlice";
import { Minimize2 } from "lucide-react";

/**
 * ドロワーのプロパティ
 * @param {React.ReactNode} children ドロワーの中身
 * @param {boolean} fullView ドロワーを全画面表示するかどうか
 * @param {boolean} modal ドロワーをモーダル表示するかどうか
 * @param {string} title ドロワーのタイトル
 * @param {string} [subTitle] ドロワーのサブタイトル
 */
interface DrawerProps {
    fullView?: boolean;
    modal?: boolean;
    title?: string;
    subTitle?: string; // TODO ボタンの属性を継承する
}

const SwipeableDrawer = ({ modal = false, title, subTitle }: DrawerProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { view, resultCount, snapPoint, selectedShopId } = useSelector(
        (state: RootState) => state.drawer,
    );

    const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);
    const [currentSubTitle, setCurrentSubTitle] = useState<string | undefined>(subTitle);

    useEffect(() => {
        if (view === "detail" && selectedShopId) {
            setCurrentTitle("店舗詳細");
        } else if (view === "list") {
            setCurrentTitle(title || "検索結果");
            if (resultCount <= 0) {
                setCurrentSubTitle("検索ボタンを押して周囲を検索しましょう");
                dispatch(setSnapPoint("min"));
            } else {
                setCurrentSubTitle(`検索結果: ${resultCount}件`);
                dispatch(setSnapPoint("normal"));
            }
        }
    }, [view, resultCount, selectedShopId]);

    const handlePrevButton = () => {
        dispatch(changeView("list"));
    };

    const handleActiveSnapPoint = (point: string | number | null) => {
        if (point === null || point == 0) return;
        dispatch(setSnapPointByRaw(point));
    };

    /**
     * ドロワーの内容
     */
    const Content = () => {
        if (view === "detail") {
            return <ShopDetail shopId={selectedShopId} />; // TODO: searchParamsからshopIdを取得する様にしたい
        } else if (view === "list") {
            return <ShopList />;
        }
        return null;
    };

    /**
     * 一覧に戻るボタン
     */
    const PrevButton = () => {
        return view === "detail" ? <Button onClick={handlePrevButton}>一覧に戻る</Button> : <></>;
    };

    // TODO: ドロワーが最小化された時にそれ以上下に動かない様にする。
    return (
        <Drawer
            modal={modal}
            snapPoints={snapPoints}
            activeSnapPoint={snapPoint}
            setActiveSnapPoint={handleActiveSnapPoint}
            open
        >
            <DrawerContent
                className="fixed top-0 bg-neutral-50 md:w-96"
                onMouseEnter={() => dispatch(setSnapPoint("full"))}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-center p-4 py-5 md:pb-1 md:justify-end">
                        <div className="mx-auto h-2 w-20 rounded-full bg-neutral-400 md:hidden" />
                        <Button
                            size="icon"
                            className="hidden md:flex"
                            variant="outline"
                            onClick={() => dispatch(setSnapPoint("min"))}
                        >
                            <Minimize2 />
                        </Button>
                    </div>
                    <DrawerHeader className="flex flex-col items-center md:pt-0">
                        <DrawerTitle>{currentTitle}</DrawerTitle>
                        <DrawerDescription>{currentSubTitle}</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 py-2 w-full overflow-scroll">
                        <Content />
                    </div>
                    <DrawerFooter className="flex justify-center">
                        <PrevButton />
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default React.memo(SwipeableDrawer);
