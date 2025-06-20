import { createFileRoute, Navigate, notFound } from "@tanstack/react-router";
import { getRouterState } from "@/storages/router";
import { getSpaces } from "@/storages/spaces";

export const Route = createFileRoute("/")({
	component: () => {
		const { initialRoute } = Route.useLoaderData();
		return <Navigate replace to={initialRoute} />;
	},
	loader: async () => {
		const routerState = await getRouterState();

		if (routerState && routerState !== "/") {
			return { initialRoute: routerState };
		}

		const spaces = await getSpaces();
		const spaceDomain = spaces?.[0]?.spaceDomain;

		if (!spaceDomain) {
			throw notFound();
		}

		return { initialRoute: `/${spaceDomain}/notifications` };
	},
});
