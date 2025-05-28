import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

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
