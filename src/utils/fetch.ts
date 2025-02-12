import { logger } from "./logger";
import { ZodSchema } from "zod";

/**
 * urlにクエリパラメータを追加する
 * @param baseUrl
 * @param queryParams
 * @returns
 */
const urlWithSearchParameter = (
    baseUrl: URL,
    queryParams: Record<string, string | Array<string>>,
) => {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item) => params.append(key, item));
        }
        params.append(key, String(value));
    });
    baseUrl.search = params.toString();
    return baseUrl.toString();
};

/**
 * レスポンスの検証を行う
 * @param response
 * @param schema
 * @returns
 */
const responseValidation = async <T>(response: Response, schema: ZodSchema<T>): Promise<T> => {
    if (!response.ok) {
        logger("error", `Failed to fetch: ${response.statusText}`, {
            calledBy: "responseValidation()",
            statusCode: response.status,
        });
        throw new Error(response.statusText);
    }
    const json = await response.json();

    // zodを用いたスキーマ検証
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
        const error = parsed.error.errors[0];
        logger("error", `Failed to parse: ${error.message} [${error.path}]`, {
            calledBy: "responseValidation()",
            statusCode: response.status,
        });
        throw new Error(parsed.error.errors.toString());
    }

    return parsed.data;
};

/**
 * 差異吸収用のfetch関数(POST)
 * @param url
 * @param body
 * @param schema
 * @returns
 */
export const postFetch = async <T>(
    baseUrlString: string,
    queryParams: Record<string, string | Array<string>>,
    body: unknown,
    schema: ZodSchema<T>,
): Promise<T> => {
    // URLの生成
    const baseUrl = new URL(baseUrlString);
    const url = urlWithSearchParameter(baseUrl, queryParams);

    // フェッチの実行
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return responseValidation(response, schema);
};

/**
 * 差異吸収用のfetch関数(GET)
 * @param baseUrlString
 * @param schema
 * @returns
 */
export const getFetch = async <T>(
    baseUrlString: string,
    queryParams: Record<string, unknown>,
    schema: ZodSchema<T>,
): Promise<T> => {
    // URLの生成
    const baseUrl = new URL(baseUrlString);
    const url = urlWithSearchParameter(
        baseUrl,
        queryParams as Record<string, string | Array<string>>,
    );

    // フェッチの実行
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return responseValidation(response, schema);
};
