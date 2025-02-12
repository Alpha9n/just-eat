import { z } from "zod";

export const shopRequestSchema = z.object({
    keyword: z.string().optional(),
    genre: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    range: z
        .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
        .optional(),
    start: z.number().positive().optional(),
    count: z.number().min(1).max(100).optional().default(10),
    order: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
    format: z.literal("json").optional(),
    type: z.literal("lite").optional(),
});

export const shopLiteSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    lat: z.number(),
    lng: z.number(),
    genre: z.object({
        name: z.string(),
        catch: z.string(),
    }),
    catch: z.string(),
    access: z.string(),
    urls: z.object({
        pc: z.string(),
    }),
    photo: z.object({
        pc: z.object({
            l: z.string(),
            m: z.string(),
            s: z.string(),
        }),
    }),
});

export const liteResponseSchema = z.object({
    results: z.object({
        api_version: z.string(),
        results_available: z.number(),
        results_returned: z.string(),
        results_start: z.number(),
        shop: z.array(shopLiteSchema),
    }),
});

const isAllowedSchema = z.union([z.literal("可"), z.literal("不可"), z.string()]);
const isExistSchema = z.union([z.literal("あり"), z.literal("なし"), z.string()]);

export const shopSchema = shopLiteSchema.extend({
    logo_image: z.string().url(),
    name_kana: z.string(),
    station_name: z.string(),
    ktai_coupon: z.union([z.literal(0), z.literal(1)]),
    large_service_area: z.object({
        code: z.string(),
        name: z.string(),
    }),
    service_area: z.object({
        code: z.string(),
        name: z.string(),
    }),
    large_area: z.object({
        code: z.string(),
        name: z.string(),
    }),
    middle_area: z.object({
        code: z.string(),
        name: z.string(),
    }),
    small_area: z.object({
        code: z.string(),
        name: z.string(),
    }),
    genre: z.object({
        code: z.string(),
        name: z.string(),
        catch: z.string(),
    }),
    sub_genre: z
        .object({
            code: z.string(),
            name: z.string(),
        })
        .optional(),
    budget: z.object({
        code: z.string(),
        name: z.string(),
        average: z.string(),
    }),
    capacity: z.number(),
    mobile_access: z.string(),
    photo: z.object({
        pc: z.object({
            l: z.string(),
            m: z.string(),
            s: z.string(),
        }),
        mobile: z.object({
            l: z.string(),
            s: z.string(),
        }),
    }),
    open: z.string(),
    close: isExistSchema,
    party_capacity: z.union([z.string(), z.number()]),
    other_memo: z.string(),
    shop_detail_memo: z.string(),
    budget_memo: z.string(),
    wedding: z.string(),
    free_drink: isExistSchema,
    free_food: isExistSchema,
    private_room: isExistSchema,
    horigotatsu: isExistSchema,
    tatami: isExistSchema,
    card: z.string(),
    non_smoking: z.string(),
    charter: z.string(),
    parking: isExistSchema,
    barrier_free: isExistSchema,
    show: isExistSchema,
    karaoke: isExistSchema,
    band: isAllowedSchema,
    tv: isExistSchema,
    lunch: isExistSchema,
    midnight: z.string(),
    english: isExistSchema,
    pet: isAllowedSchema,
    child: z.string(),
    wifi: z.string(),
    coupon_urls: z.object({
        pc: z.string().url(),
        sp: z.string().url(),
    }),
});

export const responseSchema = z.object({
    results: z.object({
        api_version: z.string(),
        results_available: z.number(),
        results_returned: z.string(),
        results_start: z.number(),
        shop: z.array(shopSchema),
    }),
});
