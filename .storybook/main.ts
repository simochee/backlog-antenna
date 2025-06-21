import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
	],
	core: {
		disableTelemetry: true,
	},
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	staticDirs: ["../public"],
	stories: ["../**/*.stories.tsx"],
	typescript: {
		check: true,
		reactDocgen: "react-docgen-typescript",
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [
				// biome-ignore lint/suspicious/noExplicitAny: TailwindCSS v4 は Vite 6 に未対応
				tailwindcss() as any,
				tsconfigPaths({
					projects: ["./tsconfig.json"],
				}),
			],
		});
	},
};

export default config;
