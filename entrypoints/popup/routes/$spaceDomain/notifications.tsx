import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { NotificationItem } from "@/components/NotificationItem";
import { VirtualList } from "@/components/VirtualList";
import { useBacklogApi } from "@/hooks/useBacklogApi";

export const Route = createFileRoute("/$spaceDomain/notifications")({
	component: () => {
		const backlogApi = useBacklogApi();

		const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
			useSuspenseInfiniteQuery({
				async queryFn({ pageParam }) {
					const maxId = pageParam === -1 ? undefined : pageParam;

					const items = await backlogApi.getNotifications({
						count: 50,
						maxId,
					});

					return items || [];
				},
				queryKey: ["notifications"],
				getNextPageParam(lastGroup) {
					const lastItem = lastGroup.slice().pop();
					return lastItem && lastGroup.length === 50 ? lastItem.id : undefined;
				},
				initialPageParam: -1,
			});

		const items = data?.pages.flat() || [];

		return (
			<VirtualList
				count={items.length}
				estimateSize={() => 88}
				renderItem={({ index }) => (
					<NotificationItem notification={items[index]} />
				)}
				onLoadNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		);
	},
	errorComponent: ({ reset }) => (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			<div className="text-center text-red-600">
				お知らせの取得に失敗しました
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
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			<div className="text-center text-gray-600">お知らせを読み込み中...</div>
		</div>
	),
});
