import { createFileRoute, Navigate, notFound } from "@tanstack/react-router";

const NoSpacePage: React.FC = () => (
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

export const Route = createFileRoute("/")({
	component: IndexPage,
	loader: async () => {
		const { getSpaces } = await import("@/storages/spaces");
		const spaces = await getSpaces();

		if (spaces.length === 0) {
			throw notFound();
		}

		return { spaces };
	},
	notFoundComponent: NoSpacePage,
});

function IndexPage() {
	const { spaces } = Route.useLoaderData();

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
