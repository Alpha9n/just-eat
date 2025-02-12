export const RANGES = [300, 500, 1000, 2000, 3000] as const;

/**
 * hotPepperAPI 用の距離を人間にわかりやすい距離単位に変換する
 * @param range 
 * @returns 距離（メートル）
 */
export const exchangeRangeToMeter = (range: 1 | 2 | 3 | 4 | 5): number => {
    return RANGES[range - 1];
};
