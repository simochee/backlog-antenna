import { useEffect, useState } from "react";
import { storage } from "wxt/storage";
import { useCurrentSpace } from "@/hooks/useCurrentSpace";

type Props = {
	path: `/api/v2/${string}`;
} & Omit<React.ComponentProps<"img">, "src">;

export const BacklogImage: React.FC<Props> = ({ path, alt = "", ...props }) => {
	const { spaceDomain, apiKey } = useCurrentSpace();
	const [cachedUrl, setCachedUrl] = useState<string | null>(null);

	useEffect(() => {
		const cacheKey = `image:${spaceDomain}${path}`;
		const imageUrl = `https://${spaceDomain}${path}?apiKey=${apiKey}`;

		// キャッシュから取得を試行
		const loadCachedImage = async () => {
			try {
				const cached = await storage.getItem<string>(`local:${cacheKey}`);
				if (cached) {
					setCachedUrl(cached);
					return;
				}

				// キャッシュにない場合は画像を取得してbase64に変換
				const response = await fetch(imageUrl);
				if (response.ok) {
					const blob = await response.blob();
					const reader = new FileReader();
					reader.onload = async () => {
						const base64 = reader.result as string;
						setCachedUrl(base64);
						// ストレージにキャッシュ（24時間後に期限切れ）
						await storage.setItem(`local:${cacheKey}`, base64, {
							maxAge: 24 * 60 * 60 * 1000, // 24時間
						});
					};
					reader.readAsDataURL(blob);
				} else {
					// フォールバック：直接URLを使用
					setCachedUrl(imageUrl);
				}
			} catch (error) {
				console.error("画像のキャッシュ処理に失敗:", error);
				// エラー時は直接URLを使用
				setCachedUrl(imageUrl);
			}
		};

		loadCachedImage();
	}, [spaceDomain, path, apiKey]);

	// キャッシュされたURLがない場合は一時的に直接URLを使用
	const src = cachedUrl || `https://${spaceDomain}${path}?apiKey=${apiKey}`;

	return <img src={src} alt={alt} {...props} />;
};
