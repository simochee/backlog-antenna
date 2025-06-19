import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useNotifications } from "@/hooks/useNotifications";

export const Route = createFileRoute("/$spaceDomain/notifications")({
	component: NotificationsPage,
});

function NotificationsPage() {
	const {
		items: notifications,
		isLoading,
		error,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useNotifications();

	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 }
		);

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (error) {
		return (
			<div className="p-4">
				<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
				<div className="text-red-600">
					エラーが発生しました: {error.message}
				</div>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			
			{isLoading ? (
				<div className="text-gray-600">読み込み中...</div>
			) : (
				<>
					<div className="space-y-2">
						{notifications.map((notification) => (
							<div
								key={notification.id}
								className="border rounded-lg p-3 hover:bg-gray-50"
							>
								<div className="font-medium text-sm">
									{notification.project?.name}
								</div>
								<div className="text-gray-900 text-sm">
									{notification.content}
								</div>
								<div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
									<span>{notification.sender?.name}</span>
									<span>•</span>
									<span>
										{new Date(notification.created).toLocaleDateString("ja-JP")}
									</span>
								</div>
							</div>
						))}
					</div>

					{hasNextPage && (
						<div
							ref={loadMoreRef}
							className="py-4 text-center text-gray-600 text-sm"
						>
							{isFetchingNextPage ? "読み込み中..." : ""}
						</div>
					)}

					{!hasNextPage && notifications.length > 0 && (
						<div className="py-4 text-center text-gray-500 text-sm">
							すべてのお知らせを表示しました
						</div>
					)}
				</>
			)}
		</div>
	);
}
