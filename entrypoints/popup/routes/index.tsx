import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: IndexPage,
	loader: async () => {
		const { getSpaces } = await import("@/storages/spaces");
		return { spaces: await getSpaces() };
	},
});

function IndexPage() {
	const { spaces } = Route.useLoaderData();

	// スペースが存在しない場合はオプションページに遷移させる想定
	// TODO: 実際のオプションページ実装後に適切なページに遷移
	if (spaces.length === 0) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="text-center">
					<h2 className="mb-2 font-semibold text-gray-900 text-xl">
						スペースが設定されていません
					</h2>
					<p className="text-gray-600">
						オプションページでスペースを追加してください。
					</p>
				</div>
			</div>
		);
	}

	// TODO: storage.localから最後に表示していたルートを取得してリダイレクト
	// 今は最初のスペースのnotificationsページにリダイレクト
	const defaultSpace = spaces[0];
	return (
		<Navigate
			params={{ spaceDomain: defaultSpace.spaceDomain }}
			replace
			to="/$spaceDomain/notifications"
		/>
	);
}
