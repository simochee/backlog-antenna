import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { NotFoundPage } from "@/entrypoints/popup/components/NotFoundPage";
import { getSpaces } from "@/storages/spaces";

export const Route = createFileRoute("/$spaceDomain")({
	component: SpaceLayout,
	loader: async ({ params: { spaceDomain } }) => {
		const spaces = await getSpaces();
		const spaceExists = spaces.some(
			(space) => space.spaceDomain === spaceDomain,
		);

		if (!spaceExists) {
			throw notFound();
		}

		return { spaces };
	},
	notFoundComponent: NotFoundPage,
	pendingComponent: () => (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="text-gray-600 text-lg">読み込み中...</div>
			</div>
		</div>
	),
});

function SpaceLayout() {
	const { spaceDomain } = Route.useParams();

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow">
				<div className="px-4 py-3">
					<h1 className="font-semibold text-gray-900 text-lg">{spaceDomain}</h1>
				</div>
			</header>
			<main className="px-4 py-6">
				<Outlet />
			</main>
		</div>
	);
}
