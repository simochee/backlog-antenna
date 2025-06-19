import { useInfiniteQuery } from "@tanstack/react-query";
import type { Notification } from "backlog-js";
import { useBacklogApi } from "./useBacklogApi";

const NOTIFICATIONS_PAGE_SIZE = 5;

/**
 * 自分へのお知らせを取得するInfinite Query hook
 * minIdベースのページネーションでお知らせ一覧を取得する
 * @returns お知らせ一覧、ローディング状態、エラー情報、次ページ取得関数
 */
export const useNotifications = () => {
	const { api, space, error: apiError } = useBacklogApi();

	const query = useInfiniteQuery({
		enabled: !!api && !!space && !apiError,
		gcTime: Number.POSITIVE_INFINITY,
		getNextPageParam: (lastPage) => lastPage.nextMinId,
		initialPageParam: undefined,
		queryFn: async ({ pageParam }) => {
			if (!api || !space) {
				throw new Error("APIクライアントまたはスペース情報が利用できません");
			}

			// お知らせを取得（minIdベース）
			const params: { count: number; minId?: number } = {
				count: NOTIFICATIONS_PAGE_SIZE,
			};

			if (pageParam) {
				params.minId = pageParam;
			}

			const response = await api.getNotifications(params);
			const items = response as Notification[];

			// 最後のアイテムのIDを次のminIdとして使用
			const lastItem = items[items.length - 1];
			const nextMinId = lastItem?.id ? lastItem.id - 1 : undefined;

			return {
				items,
				nextMinId:
					items.length === NOTIFICATIONS_PAGE_SIZE ? nextMinId : undefined,
			};
		},
		queryKey: ["notifications", space?.spaceDomain], // 3分間
		staleTime: 3 * 60 * 1000, // セッション中は常駐
	});

	const allNotifications =
		query.data?.pages.flatMap((page) => page.items) ?? [];

	return {
		error: apiError || query.error,
		fetchNextPage: query.fetchNextPage,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		isLoading: query.isLoading,
		items: allNotifications,
		refetch: query.refetch,
	};
};
