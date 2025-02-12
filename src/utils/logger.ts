import pino from "pino";

export type LogLevel = "info" | "warn" | "error" | "debug";

type Option = {
    calledBy: string;
    statusCode: number;
};

const pinoConfig: pino.LoggerOptions = {
    browser: {
        asObject: true,
    },
};

const pinoInstance = pino(pinoConfig);

/**
 * ログ出力関数
 *
 * @example logger('info', 'message', { calledBy: 'functionName()', statusCode: 200 });
 * @param level ログレベル
 * @param message ログ内容
 * @param option 詳細情報
 */
export const logger = (level: LogLevel, message: string, option: Option) => {
    switch (level) {
        case "info":
            pinoInstance.info(option, message);
            break;
        case "warn":
            pinoInstance.warn(option, message);
            break;
        case "error":
            pinoInstance.error(option, message);
            break;
        case "debug":
            pinoInstance.debug(option, message);
            break;
    }
};
