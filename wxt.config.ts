import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "wxt";

export default defineConfig({
	manifest: {
		default_locale: "ja",
		description: "__MSG_ext_description__",
		name: "__MSG_ext_name__",
	},
	modules: ["@wxt-dev/i18n/module", "@wxt-dev/auto-icons"],
	vite: () => ({
		plugins: [
			// biome-ignore lint/suspicious/noExplicitAny: TailwindCSS v4 は Vite 6 に未対応
			tailwindcss() as any,
			tanstackRouter({
				autoCodeSplitting: true,
				generatedRouteTree: "./entrypoints/popup/routeTree.gen.ts",
				routesDirectory: "./entrypoints/popup/routes",
				target: "react",
			}),
		],
	}),
});
