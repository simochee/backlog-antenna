import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/style.css";
import { createQueryClient } from "@/utils/queryClient";
import { createAppRouter } from "@/utils/router";

const queryClient = createQueryClient();
const router = createAppRouter();

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
