import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import {
	createMemoryHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/style.css";
import { persister, queryClient } from "@/utils/queryClient";
import { routeTree } from "./routeTree.gen";

const memoryHistory = createMemoryHistory({
	initialEntries: ["/"],
});

const router = createRouter({
	history: memoryHistory,
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootEl = document.getElementById("root");

if (!rootEl) {
	throw new Error("Root element not found");
}

const root = createRoot(rootEl);
root.render(
	<StrictMode>
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			<RouterProvider router={router} />
		</PersistQueryClientProvider>
	</StrictMode>,
);
