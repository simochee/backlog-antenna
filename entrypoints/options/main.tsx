import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OptionsView } from "./components/OptionsView";

const rootEl = document.getElementById("root");

if (!rootEl) {
	throw new Error("Root element not found");
}

const queryClient = new QueryClient();

const root = createRoot(rootEl);
root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<OptionsView />
		</QueryClientProvider>
	</StrictMode>,
);
