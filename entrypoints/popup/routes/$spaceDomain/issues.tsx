import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IssueItem } from "@/components/IssueItem";
import { IssueItemSkeleton } from "@/components/IssueItemSkeleton";
import { SkeltonList } from "@/components/SkeltonList";
import { VirtualList } from "@/components/VirtualList";
import { useBacklogApi } from "@/hooks/useBacklogApi";

export const Route = createFileRoute("/$spaceDomain/issues")({
	component: () => {
		const backlogApi = useBacklogApi();

		const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
			useSuspenseInfiniteQuery({
				async queryFn({ pageParam }) {
					const offset = pageParam === -1 ? 0 : pageParam;

					const items = await backlogApi.getRecentlyViewedIssues({
						count: 50,
						offset,
						order: "desc",
					});

					return items || [];
				},
				queryKey: ["recentlyViewedIssues"],
				getNextPageParam(lastGroup, _allGroups, lastPageParam) {
					const offset = lastPageParam === -1 ? 0 : lastPageParam;
					return lastGroup.length === 50 ? offset + 50 : undefined;
				},
				initialPageParam: -1,
				gcTime: 0,
			});

		const items = data?.pages.flat() || [];

		return (
			<VirtualList
				count={items.length}
				estimateSize={() => 80}
				renderItem={({ index }) => <IssueItem issue={items[index]} />}
				onLoadNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		);
	},
	errorComponent: ({ reset }) => (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">最近見た課題</h2>
			<div className="text-center text-red-600">
				最近見た課題の取得に失敗しました
				<button
					className="ml-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
					onClick={reset}
					type="button"
				>
					再読み込み
				</button>
			</div>
		</div>
	),
	pendingComponent: () => (
		<SkeltonList>
			<IssueItemSkeleton />
		</SkeltonList>
	),
});
