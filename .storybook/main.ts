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
	stories: ["../src/**/*.stories.tsx"],
	typescript: {
		check: true,
		reactDocgen: "react-docgen-typescript",
	},
};

export default config;
