import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotFound } from "./index";

/**
 * NotFoundコンポーネントのStorybook定義
 */
const meta = {
	component: NotFound,
	tags: ["autodocs"],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なNotFoundページ
 */
export const Default: Story = {};

/**
 * スペースが存在しない場合のエラー表示
 */
export const NoSpaces: Story = {};
