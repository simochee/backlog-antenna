import { createFileRoute } from "@tanstack/react-router";
import { VirtualNotificationList } from "@/entrypoints/popup/components/VirtualNotificationList";
import { useNotificationsBatch } from "@/entrypoints/popup/hooks/useNotificationsBatch";
import { getSpaces } from "@/storages/spaces";

export const Route = createFileRoute("/$spaceDomain/notifications")({
	component: NotificationsPage,
	loader: async ({ params: { spaceDomain } }) => {
		const spaces = await getSpaces();
		const currentSpace = spaces.find(
			(space) => space.spaceDomain === spaceDomain,
		);

		if (!currentSpace) {
			throw new Error("Space not found");
		}

		return { currentSpace };
	},
	pendingComponent: () => (
		<div className="flex items-center justify-center py-8">
			<div className="text-gray-600">読み込み中...</div>
		</div>
	),
});

function NotificationsPage() {
	const { currentSpace } = Route.useLoaderData();

	console.log("Current space:", currentSpace);

	const {
		notifications,
		totalCount,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	} = useNotificationsBatch(currentSpace.spaceDomain, currentSpace.apiKey);

	console.log(
		"Hook status:",
		status,
		"notifications:",
		notifications.length,
		"error:",
		error,
	);

	if (status === "pending") {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-gray-600">読み込み中...</div>
			</div>
		);
	}

	if (status === "error") {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-red-600">
					エラーが発生しました:{" "}
					{error instanceof Error ? error.message : "不明なエラー"}
				</div>
			</div>
		);
	}

	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			{notifications.length === 0 ? (
				<div className="py-8 text-center">
					<div className="font-medium text-gray-500">
						📮 お知らせはありません
					</div>
					<div className="mt-1 text-gray-400 text-sm">
						新しい通知があると、ここに表示されます
					</div>
				</div>
			) : (
				<VirtualNotificationList
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
					notifications={notifications}
					totalCount={totalCount}
				/>
			)}
		</div>
	);
}
