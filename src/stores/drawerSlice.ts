import { liteResponseSchema, shopRequestSchema } from "@/schemas/shopSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { initialMapState } from "./mapSlice";

type ShopResult = z.infer<typeof liteResponseSchema>;
type ShopRequestOptions = z.infer<typeof shopRequestSchema>;

interface DrawerState {
    view: "list" | "detail";
    selectedShopId: string | null;
    snapPoint: string | number | null;
    resultCount: number;
    page: number;
    shops: ShopResult["results"]["shop"];
    shopsSearchOptions: ShopRequestOptions;
}

export const snapPoints = ["200px", "350px", 1];

export const initialState: DrawerState = {
    view: "list",
    selectedShopId: null,
    snapPoint: snapPoints[0],
    resultCount: 0,
    page: 1,
    shops: [],
    shopsSearchOptions: {
        range: initialMapState.range,
        lat: initialMapState.mapDetail.center.lat,
        lng: initialMapState.mapDetail.center.lng,
        start: 1,
        count: 10,
        order: 4,
        genre: "",
        keyword: "",
        format: "json",
        type: "lite",
    },
};

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        changeView: (state, action: PayloadAction<"list" | "detail">) => {
            state.view = action.payload;
        },
        selectShop: (state, action: PayloadAction<string | null>) => {
            state.view = "detail";
            state.selectedShopId = action.payload;
        },
        setShops: (state, action: PayloadAction<ShopResult>) => {
            state.view = "list";
            state.resultCount = action.payload.results.results_available;
            state.shops = action.payload.results.shop;
        },
        setSnapPoint: (state, action: PayloadAction<"min" | "normal" | "full">) => {
            switch (action.payload) {
                case "min":
                    state.snapPoint = snapPoints[0];
                    break;
                case "normal":
                    state.snapPoint = snapPoints[1];
                    break;
                case "full":
                    state.snapPoint = snapPoints[2];
                    break;
            }
        },
        setSnapPointByRaw: (state, action: PayloadAction<string | number | null>) => {
            state.snapPoint = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            if (action.payload < 1) {
                state.page = 1;
                return;
            }
            state.page = action.payload;
        },
        setShopsSearchOptions: (state, action: PayloadAction<ShopRequestOptions>) => {
            state.shopsSearchOptions = action.payload;
        },
        setCurrentSearchLocation: (state, action: PayloadAction<{ lat: number; lng: number }>) => {
            state.shopsSearchOptions.lat = action.payload.lat;
            state.shopsSearchOptions.lng = action.payload.lng;
        },
        setCurrentSearchRange: (state, action: PayloadAction<1 | 2 | 3 | 4 | 5>) => {
            state.shopsSearchOptions.range = action.payload;
        },
        resetState: (state) => {
            state.view = initialState.view;
            state.selectedShopId = initialState.selectedShopId;
            state.resultCount = initialState.resultCount;
            state.shops = initialState.shops;
            state.snapPoint = initialState.snapPoint;
            state.page = initialState.page;
            state.shopsSearchOptions = initialState.shopsSearchOptions;
        },
    },
});

export const {
    changeView,
    selectShop,
    setShops,
    resetState,
    setSnapPoint,
    setSnapPointByRaw,
    setPage,
    setCurrentSearchLocation,
    setCurrentSearchRange,
    setShopsSearchOptions,
} = drawerSlice.actions;
export default drawerSlice.reducer;
