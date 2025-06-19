import { createFileRoute } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Backlog } from "backlog-js";
import { useCallback, useEffect, useRef } from "react";
import { getSpaces } from "@/storages/spaces";

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
 * 無限スクロールで自分宛のお知らせを表示する
 */
function NotificationsPage() {
	const { spaceDomain } = Route.useParams();
	const scrollRef = useRef<HTMLDivElement>(null);

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

	const handleScroll = useCallback(() => {
		if (!scrollRef.current) return;

		const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
		const scrollPosition = scrollTop + clientHeight;
		const threshold = scrollHeight - 100;

		if (scrollPosition >= threshold && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	useEffect(() => {
		const scrollElement = scrollRef.current;
		if (!scrollElement) return;

		scrollElement.addEventListener("scroll", handleScroll);
		return () => scrollElement.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

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

	const notifications = data?.pages.flat() || [];

	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			
			<div
				ref={scrollRef}
				className="max-h-96 overflow-y-auto"
				style={{ height: "400px" }}
			>
				{notifications.length > 0 ? (
					<div className="space-y-3">
						{notifications.map((notification) => (
							<NotificationItem key={notification.id} notification={notification} />
						))}
						
						{isFetchingNextPage && (
							<div className="text-center text-gray-600 py-4">
								さらに読み込み中...
							</div>
						)}
						
						{!hasNextPage && notifications.length > 0 && (
							<div className="text-center text-gray-500 py-4">
								すべてのお知らせを表示しました
							</div>
						)}
					</div>
				) : (
					<div className="text-center text-gray-600">
						お知らせがありません
					</div>
				)}
			</div>
		</div>
	);
}

/**
 * お知らせリーズンのテキストを返す
 */
function getReasonText(reason: number): string {
	switch (reason) {
		case 1:
			return "課題が担当されました";
		case 2:
			return "課題にコメントがありました";
		case 3:
			return "課題が追加されました";
		case 4:
			return "課題が更新されました";
		case 5:
			return "ファイルが追加されました";
		case 6:
			return "プロジェクトにユーザーが追加されました";
		case 9:
			return "その他";
		case 10:
			return "プルリクエストが担当されました";
		case 11:
			return "プルリクエストにコメントが追加されました";
		case 12:
			return "プルリクエストが追加されました";
		case 13:
			return "プルリクエストが更新されました";
		default:
			return "不明な通知";
	}
}

/**
 * 個別のお知らせアイテムコンポーネント
 */
function NotificationItem({ notification }: { notification: any }) {
	const reasonText = getReasonText(notification.reason);
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
