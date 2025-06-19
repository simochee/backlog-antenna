import { useInfiniteQuery } from "@tanstack/react-query";
import type { Issue } from "backlog-js";
import { useBacklogApi } from "./useBacklogApi";

const ISSUES_PAGE_SIZE = 20;

/**
 * 最近アクセスした課題を取得するInfinite Query hook
 * 自分がアクセスした課題の一覧をページネーション付きで取得する
 * @returns 課題一覧、ローディング状態、エラー情報、次ページ取得関数
 */
export const useIssues = () => {
	const { api, space, error: apiError } = useBacklogApi();

	const query = useInfiniteQuery({
		queryKey: ["issues", space?.spaceDomain],
		queryFn: async ({ pageParam = 0 }) => {
			if (!api || !space) {
				throw new Error("APIクライアントまたはスペース情報が利用できません");
			}

			// 最近アクセスした課題を取得
			// 実際のBacklog APIのパラメータに合わせて調整が必要
			const response = await api.getIssues({
				offset: pageParam * ISSUES_PAGE_SIZE,
				count: ISSUES_PAGE_SIZE,
				// assigneeId: [自分のユーザーID], // 実装時に動的に設定
				// sort: "updated", // 更新日順
				// order: "desc",
			});

			return {
				items: response as Issue[],
				nextOffset: response.length === ISSUES_PAGE_SIZE 
					? (pageParam + 1) * ISSUES_PAGE_SIZE 
					: undefined,
			};
		},
		getNextPageParam: (lastPage) => {
			return lastPage.nextOffset !== undefined 
				? lastPage.nextOffset / ISSUES_PAGE_SIZE 
				: undefined;
		},
		enabled: !!api && !!space && !apiError,
		initialPageParam: 0,
	});

	const allIssues = query.data?.pages.flatMap(page => page.items) ?? [];

	return {
		items: allIssues,
		isLoading: query.isLoading,
		error: apiError || query.error,
		hasNextPage: query.hasNextPage,
		isFetchingNextPage: query.isFetchingNextPage,
		fetchNextPage: query.fetchNextPage,
		refetch: query.refetch,
	};
};