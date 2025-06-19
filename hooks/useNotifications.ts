import { useInfiniteQuery } from "@tanstack/react-query";
import type { Notification } from "backlog-js";
import { useBacklogApi } from "./useBacklogApi";

const NOTIFICATIONS_PAGE_SIZE = 20;

/**
 * 自分へのお知らせを取得するInfinite Query hook
 * 自分に送られたお知らせの一覧をページネーション付きで取得する
 * @returns お知らせ一覧、ローディング状態、エラー情報、次ページ取得関数
 */
export const useNotifications = () => {
	const { api, space, error: apiError } = useBacklogApi();

	const query = useInfiniteQuery({
		queryKey: ["notifications", space?.spaceDomain],
		queryFn: async ({ pageParam = 0 }) => {
			if (!api || !space) {
				throw new Error("APIクライアントまたはスペース情報が利用できません");
			}

			// お知らせを取得
			const response = await api.getNotifications({
				offset: pageParam * NOTIFICATIONS_PAGE_SIZE,
				count: NOTIFICATIONS_PAGE_SIZE,
			});

			return {
				items: response as Notification[],
				nextOffset: response.length === NOTIFICATIONS_PAGE_SIZE 
					? (pageParam + 1) * NOTIFICATIONS_PAGE_SIZE 
					: undefined,
			};
		},
		getNextPageParam: (lastPage) => {
			return lastPage.nextOffset !== undefined 
				? lastPage.nextOffset / NOTIFICATIONS_PAGE_SIZE 
				: undefined;
		},
		enabled: !!api && !!space && !apiError,
		initialPageParam: 0,
	});

	const allNotifications = query.data?.pages.flatMap(page => page.items) ?? [];

	return {
		items: allNotifications,
		isLoading: query.isLoading,
		error: apiError || query.error,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		fetchNextPage: query.fetchNextPage,
		refetch: query.refetch,
	};
};