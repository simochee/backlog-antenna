import { useInfiniteQuery } from "@tanstack/react-query";
import {
	type FetchNotificationsOptions,
	fetchNotifications,
} from "@/services/notifications";
import type { BacklogNotification } from "@/types/backlogNotification";

/**
 * 通知の無限スクロールフック
 * @param spaceDomain スペースドメイン
 * @param apiKey APIキー
 * @param options 取得オプション
 * @returns 無限スクロール用のクエリ結果
 */
export const useNotifications = (
	spaceDomain: string,
	apiKey: string,
	options: Omit<FetchNotificationsOptions, "minId"> = {},
) => {
	return useInfiniteQuery({
		getNextPageParam: (lastPage: BacklogNotification[]) => {
			// 取得したデータが5件未満の場合は次のページなし
			if (lastPage.length < 5) return undefined;

			// 最後の通知のIDをminIdとして使用
			const lastNotification = lastPage[lastPage.length - 1];
			return lastNotification ? lastNotification.id : undefined;
		},
		initialPageParam: undefined as number | undefined,
		queryFn: async ({ pageParam }: { pageParam?: number }) => {
			const notifications = await fetchNotifications(spaceDomain, apiKey, {
				count: 5,
				order: "desc",
				...options,
				...(pageParam && { minId: pageParam }),
			});
			return notifications;
		},
		queryKey: ["notifications", spaceDomain, options],
		staleTime: 1000 * 60 * 5, // 5分間キャッシュ
	});
};
