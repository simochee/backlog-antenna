import { createRoot } from "react-dom/client";
import "./style.css";
import { StrictMode } from "react";

const rootEl = document.getElementById("root");

if (!rootEl) {
	throw new Error("Root element not found");
}

const root = createRoot(rootEl);
root.render(
	<StrictMode>
		<p>React application ready.</p>
	</StrictMode>,
);
