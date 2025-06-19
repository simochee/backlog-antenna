import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	// TODO: storage.localから最後に表示していたルートを取得してリダイレクト
	// 今は仮で最初のスペースのnotificationsページにリダイレクト
	return (
		<Navigate
			params={{ spaceDomain: "example-space" }}
			replace
			to="/$spaceDomain/notifications"
		/>
	);
}
