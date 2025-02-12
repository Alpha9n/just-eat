import pino from "pino";

export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";

type Option = {
    calledBy: string;
    statusCode: number | string;
};

/**
 * ログ出力関数
 *
 * @example logger('info', 'message', { calledBy: 'functionName()', statusCode: 200 });
 * @param level ログレベル
 * @param message ログ内容
 * @param option 詳細情報
 */
export const logger = (level: LogLevel, message: string, option?: Option) => {
    const pinoConfig: pino.LoggerOptions = {
        level,
        depthLimit: 10,
        browser: {
            asObject: true,
        },
    };

    const pinoInstance = pino(pinoConfig);
    pinoInstance[level]({ message, ...(option || {}) });
};
