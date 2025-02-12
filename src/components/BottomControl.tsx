"use client";
import { RANGES } from "@/utils/hotpepper";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { setRange } from "@/stores/mapSlice";

export const BottomControl = () => {
    const { range } = useSelector((state: RootState) => state.map);
    const dispatch = useDispatch<AppDispatch>();

    const handleTabSelect = (value: string) => {
        const rangeCode = Number(value);
        dispatch(setRange(rangeCode as 1 | 2 | 3 | 4 | 5));
    };

    return (
        <div className="absolute left-0 right-0 bottom-[110px] md:bottom-5 flex justify-center md:justify-end p-5">
            <div className="flex flex-col bg-neutral-50 rounded-md p-3 gap-3 shadow-md border border-neutral-200">
                <h2 className="font-bold">検索範囲</h2>
                <Tabs
                    className="hidden xs:flex"
                    defaultValue={range.toString()}
                    onValueChange={handleTabSelect}
                >
                    <TabsList>
                        {RANGES.map((rangeValue, index) => (
                            <TabsTrigger key={index + 1} value={(index + 1).toString()}>
                                {rangeValue}m
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
};
