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

// WXTストレージを使用したPersistorを作成
const persister = {
	persistClient: async (client: unknown) => {
		await storage.setItem("local:react-query-cache", client);
	},
	removeClient: async () => {
		await storage.removeItem("local:react-query-cache");
	},
	restoreClient: async () => {
		return await storage.getItem("local:react-query-cache");
	},
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 24 * 60 * 60 * 1000, // 3分間キャッシュ
			staleTime: 3 * 60 * 1000, // 24時間保持
		},
	},
});

// QueryClientを永続化
persistQueryClient({
	maxAge: 24 * 60 * 60 * 1000,
	persister,
	queryClient, // 24時間
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
