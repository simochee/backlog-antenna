import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md"],
		},
		variant: {
			control: "select",
			options: ["primary", "secondary"],
		},
	},
	component: Button,
	parameters: {
		a11y: {
			config: {
				rules: [
					{
						enabled: true,
						id: "color-contrast",
					},
				],
			},
			element: "#storybook-root",
		},
		layout: "centered",
	},
	tags: ["autodocs", "stable"],
	title: "Components/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Button",
		variant: "primary",
	},
};

export const Secondary: Story = {
	args: {
		children: "Button",
		variant: "secondary",
	},
};

export const Small: Story = {
	args: {
		children: "Small Button",
		size: "sm",
	},
};

export const Medium: Story = {
	args: {
		children: "Medium Button",
		size: "md",
	},
};

export const WithIcon: Story = {
	args: {
		children: "Icon Button",
		variant: "primary",
	},
	tags: ["experimental"],
};

export const Loading: Story = {
	args: {
		children: "Loading...",
		disabled: true,
	},
	parameters: {
		docs: {
			description: {
				story: "ローディング状態のボタン",
			},
		},
	},
};
