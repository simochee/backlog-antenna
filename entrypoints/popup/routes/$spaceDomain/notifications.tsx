import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationItem from "../../components/NotificationItem";

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
			<div className="text-center text-gray-600">お知らせを読み込み中...</div>
		</div>
	),
});

/**
 * お知らせページコンポーネント
 * TanStack Virtualで最適化された無限スクロールで自分宛のお知らせを表示する
 */
function NotificationsPage() {
	const parentRef = useRef<HTMLDivElement>(null);

	const {
		items: notifications,
		isLoading,
		error,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useNotifications();

	// 仮想化設定
	const virtualizer = useVirtualizer({
		count:
			notifications.length +
			(hasNextPage ? 1 : 0) +
			(isFetchingNextPage ? 1 : 0),
		estimateSize: () => 120,
		getScrollElement: () => parentRef.current,
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
				<div className="text-center text-gray-600">お知らせを読み込み中...</div>
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
				<div className="text-center text-gray-600">お知らせがありません</div>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>

			<div
				className="overflow-auto"
				ref={parentRef}
				style={{ height: "400px" }}
			>
				<div
					style={{
						height: `${virtualizer.getTotalSize()}px`,
						position: "relative",
						width: "100%",
					}}
				>
					{items.map((virtualItem) => {
						const isLoaderRow = virtualItem.index > notifications.length - 1;
						const notification = notifications[virtualItem.index];

						return (
							<div
								key={virtualItem.key}
								style={{
									height: `${virtualItem.size}px`,
									left: 0,
									position: "absolute",
									top: 0,
									transform: `translateY(${virtualItem.start}px)`,
									width: "100%",
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
