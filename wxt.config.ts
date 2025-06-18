import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

export default defineConfig({
	manifest: {
		default_locale: "ja",
		name: "__MSG_ext_name__",
		description: "__MSG_ext_description__",
	},
	modules: ["@wxt-dev/i18n/module", "@wxt-dev/auto-icons"],
	vite: () => ({
		plugins: [
			// biome-ignore lint/suspicious/noExplicitAny: TailwindCSS v4 は Vite 6 に未対応
			tailwindcss() as any,
		],
	}),
});
