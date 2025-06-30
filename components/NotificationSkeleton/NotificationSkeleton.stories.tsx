import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationSkeleton } from "./index";

/**
 * 通知アイテムのスケルトンコンポーネントのStorybook定義
 */
const meta = {
	component: NotificationSkeleton,
	tags: ["autodocs"],
	title: "Components/NotificationSkeleton",
} satisfies Meta<typeof NotificationSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なスケルトン表示
 */
export const Default: Story = {};

/**
 * 複数のスケルトンを並べた表示（リスト表示時のローディング状態）
 */
export const Multiple: Story = {
	render: () => (
		<div className="space-y-0">
			<NotificationSkeleton />
			<NotificationSkeleton />
			<NotificationSkeleton />
			<NotificationSkeleton />
			<NotificationSkeleton />
		</div>
	),
};

/**
 * 背景色付きでのスケルトン表示（既読状態のシミュレーション）
 */
export const WithBackground: Story = {
	render: () => (
		<div className="bg-gray-200">
			<NotificationSkeleton />
		</div>
	),
};

/**
 * 実際のNotificationItemと比較用
 */
export const Comparison: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 font-medium text-gray-700 text-sm">
					スケルトン状態
				</h3>
				<div className="rounded border">
					<NotificationSkeleton />
				</div>
			</div>
			<div>
				<h3 className="mb-2 font-medium text-gray-700 text-sm">
					複数スケルトン
				</h3>
				<div className="rounded border">
					<NotificationSkeleton />
					<NotificationSkeleton />
					<NotificationSkeleton />
				</div>
			</div>
		</div>
	),
};
