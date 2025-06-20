import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	addons: [
		"@storybook/addon-essentials",
		"@storybook/addon-links",
		"@storybook/addon-interactions",
		"@storybook/addon-a11y",
	],
	core: {
		disableTelemetry: true,
	},
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	staticDirs: ["../public"],
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	typescript: {
		check: true,
		reactDocgen: "react-docgen-typescript",
	},
};

export default config;
