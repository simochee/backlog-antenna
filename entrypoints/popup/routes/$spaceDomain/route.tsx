import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useSpaces } from "@/hooks/useSpaces";
import { NotFoundPage } from "../../components/NotFoundPage";

export const Route = createFileRoute("/$spaceDomain")({
	component: SpaceLayout,
});

function SpaceLayout() {
	const { spaceDomain } = Route.useParams();
	const spaces = useSpaces();

	if (spaces.isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="text-gray-600 text-lg">読み込み中...</div>
				</div>
			</div>
		);
	}

	const spaceExists = spaces.items.some(
		(space) => space.spaceDomain === spaceDomain,
	);

	if (!spaceExists) {
		return <NotFoundPage />;
	}

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
