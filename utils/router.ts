import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/entrypoints/popup/routeTree.gen";

/**
 * TanStack Router用のRouterを作成
 */
export const createAppRouter = () => {
	const memoryHistory = createMemoryHistory({
		initialEntries: ["/"],
	});

	const router = createRouter({
		history: memoryHistory,
		routeTree,
	});

	return router;
};

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createAppRouter>;
	}
}
