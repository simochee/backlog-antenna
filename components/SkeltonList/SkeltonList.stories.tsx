import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationSkeleton } from "../NotificationSkeleton";
import { SkeltonList } from "./index";

/**
 * スケルトンリストコンポーネントのStorybook定義
 */
const meta = {
	component: SkeltonList,
	tags: ["autodocs"],
} satisfies Meta<typeof SkeltonList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なスケルトンリスト（プレースホルダー要素）
 */
export const Default: Story = {
	args: {
		children: <NotificationSkeleton />,
	},
};
