import { useVirtualizer } from "@tanstack/react-virtual";
import type React from "react";
import { useEffect, useRef } from "react";
import { NotificationItem } from "@/entrypoints/popup/components/NotificationItem";
import type { BacklogNotification } from "@/types/backlogNotification";

type Props = {
	notifications: BacklogNotification[];
	totalCount: number;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
};

/**
 * 仮想化された通知リストコンポーネント
 */
export const VirtualNotificationList: React.FC<Props> = ({
	notifications,
	totalCount,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
}) => {
	const parentRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: hasNextPage ? notifications.length + 1 : notifications.length,
		estimateSize: () => 120,
		getScrollElement: () => parentRef.current, // 推定の通知アイテム高さ
		overscan: 5,
	});

	const items = virtualizer.getVirtualItems();

	useEffect(() => {
		const [lastItem] = [...items].reverse();

		if (!lastItem) return;

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
		items,
	]);

	return (
		<div>
			<div className="mb-2 text-gray-600 text-sm">
				{totalCount}件の通知を読み込み済み
				{hasNextPage ? " (さらに読み込み可能)" : " (すべて読み込み完了)"}
			</div>
			<div
				className="h-96 overflow-auto rounded-lg bg-white shadow"
				ref={parentRef}
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
										<div className="flex items-center justify-center py-8">
											<div className="text-gray-600">読み込み中...</div>
										</div>
									) : (
										<div className="flex flex-col items-center justify-center border-gray-200 border-t py-8">
											<div className="font-medium text-gray-500">
												🎉 すべての通知を読み込みました
											</div>
											<div className="mt-1 text-gray-400 text-sm">
												全{totalCount}件の通知が表示されています
											</div>
										</div>
									)
								) : (
									<NotificationItem notification={notification} />
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
