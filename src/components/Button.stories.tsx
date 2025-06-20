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
		layout: "centered",
	},
	tags: ["autodocs"],
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
