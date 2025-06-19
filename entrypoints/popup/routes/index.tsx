import { createFileRoute, Navigate, notFound } from "@tanstack/react-router";
import { getLastVisitedPage } from "@/storages/lastVisited";
import { getSpaces } from "@/storages/spaces";

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
		const spaces = await getSpaces();

		if (spaces.length === 0) {
			throw notFound();
		}

		const lastVisited = await getLastVisitedPage();

		return { lastVisited, spaces };
	},
	notFoundComponent: NoSpacePage,
});

function IndexPage() {
	const { spaces, lastVisited } = Route.useLoaderData();

	// 最後に訪問したページがあり、そのスペースが存在する場合は復元
	if (lastVisited) {
		const spaceExists = spaces.some(
			(space) => space.spaceDomain === lastVisited.spaceDomain,
		);

		if (spaceExists) {
			return (
				<Navigate
					replace
					to={`/${lastVisited.spaceDomain}${lastVisited.path}`}
				/>
			);
		}
	}

	// フォールバック: 最初のスペースのnotificationsページにリダイレクト
	const defaultSpace = spaces[0];
	return <Navigate replace to={`/${defaultSpace.spaceDomain}/notifications`} />;
}
