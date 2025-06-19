import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Backlog } from "backlog-js";
import { useCallback, useEffect, useRef } from "react";
import { getSpaces } from "@/storages/spaces";
import { getStatusText } from "@/utils/notifications";

export const Route = createFileRoute("/$spaceDomain/notifications")({
	component: NotificationsPage,
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
			<div className="text-center text-gray-600">
				お知らせを読み込み中...
			</div>
		</div>
	),
});

/**
 * お知らせページコンポーネント
 * TanStack Virtualで最適化された無限スクロールで自分宛のお知らせを表示する
 */
function NotificationsPage() {
	const { spaceDomain } = Route.useParams();
	const parentRef = useRef<HTMLDivElement>(null);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	} = useInfiniteQuery({
		queryKey: ["notifications", spaceDomain],
		queryFn: async ({ pageParam }) => {
			const spaces = await getSpaces();
			const currentSpace = spaces.find(
				(space) => space.spaceDomain === spaceDomain,
			);

			if (!currentSpace) {
				throw new Error(`Space with domain ${spaceDomain} not found`);
			}

			const backlog = new Backlog({
				apiKey: currentSpace.apiKey,
				host: spaceDomain,
			});

			const notifications = await backlog.getNotifications({
				count: 20,
				order: "desc",
				...(pageParam && { maxId: pageParam }),
			});

			return notifications;
		},
		getNextPageParam: (lastPage) => {
			if (lastPage.length === 0) return undefined;
			return lastPage[lastPage.length - 1].id;
		},
		initialPageParam: undefined as number | undefined,
	});

	const notifications = data?.pages.flat() || [];
	
	// 仮想化設定
	const virtualizer = useVirtualizer({
		count: notifications.length + (hasNextPage ? 1 : 0) + (isFetchingNextPage ? 1 : 0),
		getScrollElement: () => parentRef.current,
		estimateSize: () => 120,
		overscan: 5,
	});

	const items = virtualizer.getVirtualItems();

	// 無限スクロールのトリガー
	useEffect(() => {
		const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

		if (!lastItem) {
			return;
		}

		if (
			lastItem.index >= notifications.length - 1 &&
			hasNextPage &&
			!isFetchingNextPage
		) {
			fetchNextPage();
		}
	}, [
		hasNextPage,
		fetchNextPage,
		notifications.length,
		isFetchingNextPage,
		virtualizer.getVirtualItems,
	]);

	if (isLoading) {
		return (
			<div>
				<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
				<div className="text-center text-gray-600">
					お知らせを読み込み中...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
				<div className="text-center text-red-600">
					お知らせの取得に失敗しました
				</div>
			</div>
		);
	}

	if (notifications.length === 0) {
		return (
			<div>
				<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
				<div className="text-center text-gray-600">
					お知らせがありません
				</div>
			</div>
		);
	}

	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			
			<div
				ref={parentRef}
				className="overflow-auto"
				style={{ height: "400px" }}
			>
				<div
					style={{
						height: `${virtualizer.getTotalSize()}px`,
						width: "100%",
						position: "relative",
					}}
				>
					{items.map((virtualItem) => {
						const isLoaderRow = virtualItem.index > notifications.length - 1;
						const notification = notifications[virtualItem.index];

						return (
							<div
								key={virtualItem.key}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`,
								}}
							>
								{isLoaderRow ? (
									hasNextPage ? (
										<div className="flex items-center justify-center p-4">
											<div className="text-center text-gray-600">
												読み込み中...
											</div>
										</div>
									) : (
										<div className="flex items-center justify-center p-4">
											<div className="text-center text-gray-500">
												すべてのお知らせを表示しました
											</div>
										</div>
									)
								) : (
									<div className="p-2">
										<NotificationItem notification={notification} />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}


/**
 * 個別のお知らせアイテムコンポーネント
 */
function NotificationItem({ notification }: { notification: any }) {
	const reasonText = getStatusText(notification.reason);
	const createdDate = new Date(notification.created).toLocaleString("ja-JP");

	return (
		<div className={`rounded border p-4 ${
			notification.alreadyRead 
				? "border-gray-200 bg-white" 
				: "border-blue-200 bg-blue-50"
		}`}>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						{!notification.alreadyRead && (
							<span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
						)}
						<span className="text-sm font-medium text-blue-600">
							{reasonText}
						</span>
					</div>
					
					<h3 className="font-semibold text-gray-900 mb-1">
						{notification.issue?.summary || notification.pullRequest?.summary || "詳細なし"}
					</h3>
					
					<div className="text-sm text-gray-600 space-y-1">
						{notification.project && (
							<div>
								プロジェクト: {notification.project.name} ({notification.project.projectKey})
							</div>
						)}
						
						{notification.issue && (
							<div>
								課題: {notification.issue.issueKey}
							</div>
						)}
						
						{notification.sender && (
							<div>
								送信者: {notification.sender.name}
							</div>
						)}
						
						<div>
							日時: {createdDate}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
