import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
	globalTypes: {
		locale: {
			defaultValue: "ja",
			description: "言語設定",
			name: "Locale",
			toolbar: {
				icon: "globe",
				items: [
					{ title: "日本語", value: "ja" },
					{ title: "English", value: "en" },
				],
				showName: true,
			},
		},
	},
	parameters: {
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#ffffff" },
				{ name: "dark", value: "#1a1a1a" },
			],
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				mobile: {
					name: "Mobile",
					styles: {
						height: "667px",
						width: "375px",
					},
				},
				tablet: {
					name: "Tablet",
					styles: {
						height: "1024px",
						width: "768px",
					},
				},
			},
		},
	},
	tags: ["autodocs"],
};

export default preview;
