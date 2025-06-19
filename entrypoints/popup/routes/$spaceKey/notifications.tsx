import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$spaceKey/notifications")({
	component: NotificationsPage,
});

function NotificationsPage() {
	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			{/* お知らせ一覧のコンテンツエリア */}
		</div>
	);
}
