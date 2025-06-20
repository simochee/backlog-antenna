import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { NotificationItem } from "@/components/NotificationItem";
import { useBacklogApi } from "@/hooks/useBacklogApi";

export const Route = createFileRoute("/$spaceDomain/notifications")({
	component: () => {
		const backlogApi = useBacklogApi();

		const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
			useInfiniteQuery({
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

		const parentRef = useRef<HTMLDivElement>(null);
		const virtualizer = useVirtualizer({
			count: hasNextPage ? items.length + 1 : items.length,
			estimateSize: () => 72,
			getScrollElement: () => parentRef.current,
			overscan: 5,
		});

		useEffect(() => {
			const lastItem = virtualizer.getVirtualItems().slice().pop();

			if (!lastItem) {
				return;
			}

			if (
				lastItem.index >= items.length - 1 &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage();
			}
		}, [
			hasNextPage,
			fetchNextPage,
			items.length,
			isFetchingNextPage,
			virtualizer.getVirtualItems,
		]);

		return (
			<div className="h-popup-block overflow-auto" ref={parentRef}>
				<ul
					className="relative w-full"
					style={{ height: `${virtualizer.getTotalSize()}px` }}
				>
					{virtualizer.getVirtualItems().map((virtualRow) => {
						const isLoaderRow = virtualRow.index > items.length - 1;
						const item = items[virtualRow.index];

						return (
							<li
								className="absolute top-0 left-0 w-full"
								key={virtualRow.key}
								style={{
									height: `${virtualRow.size}px`,
									transform: `translateY(${virtualRow.start}px)`,
								}}
							>
								{isLoaderRow ? (
									<p>loading more...</p>
								) : (
									<NotificationItem notification={item} />
								)}
							</li>
						);
					})}
				</ul>
			</div>
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
