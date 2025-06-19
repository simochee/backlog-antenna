import { createFileRoute } from "@tanstack/react-router";
import { NotificationItem } from "@/entrypoints/popup/components/NotificationItem";
import { fetchNotifications } from "@/services/notifications";
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

		const notifications = await fetchNotifications(
			currentSpace.spaceDomain,
			currentSpace.apiKey,
			5,
		);

		return { notifications };
	},
	pendingComponent: () => (
		<div className="flex items-center justify-center py-8">
			<div className="text-gray-600">読み込み中...</div>
		</div>
	),
});

function NotificationsPage() {
	const { notifications } = Route.useLoaderData();

	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			{notifications.length === 0 ? (
				<div className="py-8 text-center text-gray-500">
					お知らせはありません
				</div>
			) : (
				<div className="overflow-hidden rounded-lg bg-white shadow">
					{notifications.map((notification) => (
						<NotificationItem
							key={notification.id}
							notification={notification}
						/>
					))}
				</div>
			)}
		</div>
	);
}
