import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createMemoryHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { storage } from "#imports";
import "@/assets/style.css";
import { routeTree } from "./routeTree.gen";

/**
 * WXT storageを使用したAsyncStoragePersister
 */
const createAsyncStoragePersister = () => {
	return {
		persistClient: async (client: unknown) => {
			try {
				const serialized = JSON.stringify(client);
				await storage.setItem("local:react-query-cache", serialized);
			} catch (error) {
				console.error("Failed to persist query client:", error);
			}
		},
		removeClient: async () => {
			try {
				await storage.removeItem("local:react-query-cache");
			} catch (error) {
				console.error("Failed to remove query client:", error);
			}
		},
		restoreClient: async () => {
			try {
				const serialized = await storage.getItem("local:react-query-cache");
				return serialized ? JSON.parse(serialized) : undefined;
			} catch (error) {
				console.error("Failed to restore query client:", error);
				return undefined;
			}
		},
	};
};

const persister = createAsyncStoragePersister();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 24 * 60 * 60 * 1000, // 24時間保持
			staleTime: 3 * 60 * 1000, // 3分間キャッシュ
		},
	},
});

// QueryClientを永続化
persistQueryClient({
	maxAge: 24 * 60 * 60 * 1000, // 24時間
	persister,
	queryClient,
});

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
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
