import { useEffect } from "react";

/**
 * コールバック関数を指定した時間間隔で実行するカスタムフック
 *
 * @param callback 実行するコールバック関数
 * @param delay 実行間隔
 */
const useInterval = (callback: () => void, delay: number | null) => {
    useEffect(() => {
        if (delay === null) {
            return;
        }
        const id = setInterval(callback, delay);
        return () => clearInterval(id);
    }, [callback, delay]);
};

export default useInterval;
