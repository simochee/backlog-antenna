import { addons } from "@storybook/manager-api";

addons.setConfig({
	sidebar: {
		filters: {
			patterns: (item) => {
				return !item.tags?.includes("deprecated");
			},
		},
		showRoots: true,
	},
});
