/// <reference types="vitest" />

import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	define: {
		__DEV__: "true",
		// WXT関連の定義
		__WXT_BROWSER__: '"chrome"',
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "."),
			"#imports": resolve(
				__dirname,
				"node_modules/wxt/dist/virtual/user-imports.d.ts",
			),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/test/setup.ts"],
	},
});
