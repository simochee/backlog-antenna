import type { Preview } from "@storybook/react";

// WXTの自動インポート機能をモック
(globalThis as any).storage = {
	defineItem: () => ({
		getValue: () => Promise.resolve([]),
		setValue: () => Promise.resolve(),
	}),
};

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
