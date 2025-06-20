import { storage } from "#imports";

type ImageCacheData = {
	base64: string;
	timestamp: number;
};

const imageCaches = storage.defineItem<Record<string, ImageCacheData>>(
	"local:image-caches",
	{
		fallback: {},
	},
);

/**
 * 画像のキャッシュキーを生成する
 * @param spaceDomain スペースドメイン
 * @param path API パス
 * @returns キャッシュキー
 */
const generateCacheKey = (spaceDomain: string, path: string): string => {
	return `${spaceDomain}${path}`;
};

/**
 * キャッシュされた画像データが有効期限内かどうかを確認する
 * @param timestamp キャッシュされた時刻
 * @param maxAge 最大有効期限（ミリ秒）
 * @returns 有効期限内の場合true
 */
const isCacheValid = (timestamp: number, maxAge: number): boolean => {
	return Date.now() - timestamp < maxAge;
};

/**
 * 画像をキャッシュから取得する
 * @param spaceDomain スペースドメイン
 * @param path API パス
 * @param maxAge 最大有効期限（ミリ秒、デフォルト24時間）
 * @returns キャッシュされた画像のbase64データ、またはnull
 */
export const getCachedImage = async (
	spaceDomain: string,
	path: string,
	maxAge: number = 24 * 60 * 60 * 1000, // 24時間
): Promise<string | null> => {
	const caches = await imageCaches.getValue();
	const cacheKey = generateCacheKey(spaceDomain, path);
	const cached = caches[cacheKey];

	if (!cached) {
		return null;
	}

	if (!isCacheValid(cached.timestamp, maxAge)) {
		// 期限切れのキャッシュを削除
		await deleteCachedImage(spaceDomain, path);
		return null;
	}

	return cached.base64;
};

/**
 * 画像をキャッシュに保存する
 * @param spaceDomain スペースドメイン
 * @param path API パス
 * @param base64 base64形式の画像データ
 */
export const setCachedImage = async (
	spaceDomain: string,
	path: string,
	base64: string,
): Promise<void> => {
	const caches = await imageCaches.getValue();
	const cacheKey = generateCacheKey(spaceDomain, path);

	const newCaches = {
		...caches,
		[cacheKey]: {
			base64,
			timestamp: Date.now(),
		},
	};

	await imageCaches.setValue(newCaches);
};

/**
 * 指定された画像のキャッシュを削除する
 * @param spaceDomain スペースドメイン
 * @param path API パス
 */
export const deleteCachedImage = async (
	spaceDomain: string,
	path: string,
): Promise<void> => {
	const caches = await imageCaches.getValue();
	const cacheKey = generateCacheKey(spaceDomain, path);

	if (caches[cacheKey]) {
		const newCaches = { ...caches };
		delete newCaches[cacheKey];
		await imageCaches.setValue(newCaches);
	}
};

/**
 * 期限切れの画像キャッシュをクリーンアップする
 * @param maxAge 最大有効期限（ミリ秒、デフォルト24時間）
 */
export const cleanupExpiredImageCaches = async (
	maxAge: number = 24 * 60 * 60 * 1000, // 24時間
): Promise<void> => {
	const caches = await imageCaches.getValue();
	const newCaches: Record<string, ImageCacheData> = {};

	for (const [key, cache] of Object.entries(caches)) {
		if (isCacheValid(cache.timestamp, maxAge)) {
			newCaches[key] = cache;
		}
	}

	await imageCaches.setValue(newCaches);
};

/**
 * すべての画像キャッシュを削除する
 */
export const clearAllImageCaches = async (): Promise<void> => {
	await imageCaches.setValue({});
};

/**
 * 画像キャッシュの変更を監視する
 * @param callback キャッシュが変更された際に実行されるコールバック関数
 * @returns 監視を停止するための関数
 */
export const watchImageCaches = (
	callback: (
		newCaches: Record<string, ImageCacheData>,
		oldCaches: Record<string, ImageCacheData>,
	) => void,
) => {
	return imageCaches.watch(callback);
};
