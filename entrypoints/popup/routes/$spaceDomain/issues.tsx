import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { useBacklogApi } from "@/hooks/useBacklogApi";

export const Route = createFileRoute("/$spaceDomain/issues")({
	component: () => {
		const backlogApi = useBacklogApi();

		const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
			useInfiniteQuery({
				async queryFn({ pageParam }) {
					const offset = pageParam === -1 ? 0 : pageParam;

					const items = await backlogApi.getIssues({
						count: 50,
						offset,
					});

					return items || [];
				},
				queryKey: ["issues"],
				getNextPageParam(lastGroup, _allGroups, lastPageParam) {
					const offset = lastPageParam === -1 ? 0 : lastPageParam;
					return lastGroup.length === 50 ? offset + 50 : undefined;
				},
				initialPageParam: -1,
			});

		const items = data?.pages.flat() || [];

		const parentRef = useRef<HTMLDivElement>(null);
		const virtualizer = useVirtualizer({
			count: hasNextPage ? items.length + 1 : items.length,
			estimateSize: () => 88,
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
									<div className="border-gray-200 border-b p-4 hover:bg-gray-50">
										<div className="font-medium text-sm">{item.issueKey}</div>
										<div className="text-gray-900 text-sm">{item.summary}</div>
										<div className="mt-1 flex items-center gap-2 text-gray-500 text-xs">
											<span>{item.status?.name}</span>
											<span>•</span>
											<span>{item.assignee?.name || "未割り当て"}</span>
										</div>
									</div>
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
			<h2 className="mb-4 font-bold text-gray-800 text-xl">課題一覧</h2>
			<div className="text-center text-red-600">
				課題の取得に失敗しました
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
			<h2 className="mb-4 font-bold text-gray-800 text-xl">課題一覧</h2>
			<div className="text-center text-gray-600">課題を読み込み中...</div>
		</div>
	),
});
