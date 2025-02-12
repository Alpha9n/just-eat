export const RANGES = [300, 500, 1000, 2000, 3000] as const;

export const exchangeRangeToMeter = (range: 1 | 2 | 3 | 4 | 5): number => {
    return RANGES[range - 1];
};
