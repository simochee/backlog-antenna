import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$spaceDomain")({
	component: SpaceLayout,
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
