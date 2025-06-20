import type { StorybookConfig } from "@storybook/react-vite";

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
	viteFinal: async (config) => {
		if (process.env.STORYBOOK_BASE_URL) {
			config.base = process.env.STORYBOOK_BASE_URL;
		}
		return config;
	},
};

export default config;
