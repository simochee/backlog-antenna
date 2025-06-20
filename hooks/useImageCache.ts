import { useQuery } from "@tanstack/react-query";
import { getCachedImage, setCachedImage } from "@/storages/image-caches";
import { useCurrentSpace } from "./useCurrentSpace";

/**
 * 画像をキャッシュから取得し、キャッシュにない場合はフェッチしてキャッシュする
 * @param path Backlog API パス
 * @returns 画像のdata URL または直接URL
 */
export const useImageCache = (path: `/api/v2/${string}`) => {
	const { spaceDomain, apiKey } = useCurrentSpace();

	return useQuery({
		queryKey: ["imageCache", spaceDomain, path],
		queryFn: async (): Promise<string> => {
			const imageUrl = `https://${spaceDomain}${path}?apiKey=${apiKey}`;

			try {
				// キャッシュから取得を試行
				const cached = await getCachedImage(spaceDomain, path);
				if (cached) {
					return cached;
				}

				// キャッシュにない場合は画像を取得してbase64に変換
				const response = await fetch(imageUrl);
				if (!response.ok) {
					// フォールバック：直接URLを返す
					return imageUrl;
				}

				const blob = await response.blob();

				// base64に変換
				const base64 = await new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = () => resolve(reader.result as string);
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});

				// ストレージにキャッシュ
				await setCachedImage(spaceDomain, path, base64);

				return base64;
			} catch (error) {
				console.error("画像のキャッシュ処理に失敗:", error);
				// エラー時は直接URLを返す
				return imageUrl;
			}
		},
		staleTime: 24 * 60 * 60 * 1000, // 24時間
		gcTime: 24 * 60 * 60 * 1000, // 24時間
		retry: 1,
	});
};
