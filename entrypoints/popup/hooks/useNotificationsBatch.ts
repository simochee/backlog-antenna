import { useCallback, useEffect, useRef, useState } from "react";
import {
	type FetchNotificationsOptions,
	fetchNotifications,
} from "@/services/notifications";
import type { BacklogNotification } from "@/types/backlogNotification";

/**
 * 5ページずつ読み込んで累積する通知フック
 * @param spaceDomain スペースドメイン
 * @param apiKey APIキー
 * @param options 取得オプション
 * @returns バッチ読み込み用のクエリ結果
 */
export const useNotificationsBatch = (
	spaceDomain: string,
	apiKey: string,
	options: Omit<FetchNotificationsOptions, "minId"> = {},
) => {
	const [allNotifications, setAllNotifications] = useState<
		BacklogNotification[]
	>([]);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const notificationsRef = useRef<BacklogNotification[]>([]);

	// notificationsRefを更新
	useEffect(() => {
		notificationsRef.current = allNotifications;
	}, [allNotifications]);

	// 5ページ分（25件）を一度に取得
	const fetchBatch = useCallback(async () => {
		if (isLoadingMore) return;

		setIsLoadingMore(true);
		setError(null);
		const batchNotifications: BacklogNotification[] = [];

		// 現在のminIdを計算
		const currentNotifications = notificationsRef.current;
		const currentMinId =
			currentNotifications.length > 0
				? currentNotifications[currentNotifications.length - 1].id
				: undefined;

		let nextMinId = currentMinId;

		try {
			// 5ページ分（5件 × 5ページ = 25件）を順次取得
			for (let page = 0; page < 5; page++) {
				console.log(`Fetching page ${page + 1}/5, minId: ${nextMinId}`);

				const pageNotifications = await fetchNotifications(
					spaceDomain,
					apiKey,
					{
						count: 5,
						order: "desc",
						...options,
						...(nextMinId && { minId: nextMinId }),
					},
				);

				console.log(
					`Page ${page + 1} returned ${pageNotifications.length} notifications`,
				);

				// 取得したデータがない場合は終了
				if (pageNotifications.length === 0) {
					setHasMoreData(false);
					break;
				}

				batchNotifications.push(...pageNotifications);

				// 次のページのminIdを設定
				const lastNotification =
					pageNotifications[pageNotifications.length - 1];
				nextMinId = lastNotification ? lastNotification.id : undefined;

				// 5件未満の場合は最後のページなので終了
				if (pageNotifications.length < 5) {
					setHasMoreData(false);
					break;
				}
			}

			console.log(
				`Batch complete: ${batchNotifications.length} notifications fetched`,
			);

			// 累積データに追加
			if (batchNotifications.length > 0) {
				setAllNotifications((prev) => [...prev, ...batchNotifications]);
			}
		} catch (err) {
			console.error("Failed to fetch notification batch:", err);
			setError(err instanceof Error ? err : new Error("Unknown error"));
		} finally {
			setIsLoadingMore(false);
			setIsInitialLoading(false);
		}
	}, [spaceDomain, apiKey, options, isLoadingMore]);

	// 初回読み込み
	useEffect(() => {
		if (isInitialLoading && allNotifications.length === 0) {
			console.log("Starting initial fetch...");
			fetchBatch();
		}
	}, [fetchBatch, isInitialLoading, allNotifications.length]);

	// 次のバッチを読み込む関数
	const loadNextBatch = useCallback(() => {
		if (!isLoadingMore && hasMoreData) {
			console.log("Loading next batch...");
			fetchBatch();
		}
	}, [fetchBatch, isLoadingMore, hasMoreData]);

	return {
		error,
		fetchNextPage: loadNextBatch,
		hasNextPage: hasMoreData,
		isFetchingNextPage: isLoadingMore,
		notifications: allNotifications,
		status: isInitialLoading ? "pending" : error ? "error" : "success",
		totalCount: allNotifications.length,
	};
};
