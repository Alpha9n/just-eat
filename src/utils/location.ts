/**
 * 現在地を取得する関数
 * @returns 現在地の緯度経度を返す
 */
export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    if (!navigator.geolocation) {
        throw new Error("位置情報の取得がサポートされていないブラウザです。");
    }

    const options: PositionOptions = {
        enableHighAccuracy: true, // 高精度な位置情報を取得する
        timeout: 5000, // 5秒以内に位置情報を取得できない場合はエラーを返す
        maximumAge: 0, // キャッシュされた位置情報は使用しない
    };

    return new Promise((resolve, reject) => {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            if (result.state === "denied") {
                reject(new Error("位置情報の取得が許可されていません。"));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                    return;
                },
                options,
            );
        });
    });
};
