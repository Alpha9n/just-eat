"use server";

import { env } from "@/env";
import { liteResponseSchema, responseSchema, shopRequestSchema } from "@/schemas/shopSchema";
import { initialState } from "@/stores/drawerSlice";
import { getFetch } from "@/utils/fetch";
import { z } from "zod";

type ShopRequestOptions = z.infer<typeof shopRequestSchema>;

/**
 * 指定した店舗IDの店舗情報を取得する
 * @param id
 */
export const findOne = async (id: string) => {
    const res = await getFetch(
        env.HOT_PEPPER_API_URL,
        {
            key: env.HOT_PEPPER_API_KEY,
            id,
            format: "json",
        },
        responseSchema,
    );
    return res.results.shop[0];
};

/**
 * 範囲内の店舗一覧を取得する
 * @param range 1: 300m, 2: 500m, 3: 1000m, 4: 2000m, 5: 3000m
 * @param center
 * @param options
 */
export const findAll = async (
    range: 1 | 2 | 3 | 4 | 5,
    center: google.maps.LatLngLiteral,
    options: ShopRequestOptions = initialState.shopsSearchOptions,
) => {
    const res = await getFetch(
        env.HOT_PEPPER_API_URL,
        {
            ...options,
            key: env.HOT_PEPPER_API_KEY,
            range: range.toString(),
            lat: center.lat.toString(),
            lng: center.lng.toString(),
        },
        liteResponseSchema,
    );
    return res;
};
