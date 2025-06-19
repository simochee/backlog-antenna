import {
	createFileRoute,
	notFound,
	Outlet,
	useLocation,
} from "@tanstack/react-router";
import { FeatureNavigation } from "@/entrypoints/popup/components/FeatureNavigation";
import { NotFoundPage } from "@/entrypoints/popup/components/NotFoundPage";
import { SpaceSelector } from "@/entrypoints/popup/components/SpaceSelector";
import { usePageTracking } from "@/hooks/usePageTracking";
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
	const location = useLocation();

	// ページ訪問状態を追跡
	usePageTracking();

	// 現在のパスから機能を特定
	const getCurrentFeature = (): "notifications" | "projects" | "issues" => {
		if (location.pathname.includes("/notifications")) return "notifications";
		if (location.pathname.includes("/projects")) return "projects";
		if (location.pathname.includes("/issues")) return "issues";
		return "notifications"; // デフォルト
	};

	const currentFeature = getCurrentFeature();
	const currentPath = location.pathname.replace(`/${spaceDomain}`, "");

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow">
				<div className="px-4 py-3">
					<div className="mb-3 flex items-center justify-between">
						<h1 className="font-semibold text-gray-900 text-lg">
							Backlog Antenna
						</h1>
						<SpaceSelector
							currentPath={currentPath}
							currentSpaceDomain={spaceDomain}
						/>
					</div>
					<FeatureNavigation currentFeature={currentFeature} />
				</div>
			</header>
			<main className="px-4 py-6">
				<Outlet />
			</main>
		</div>
	);
}
