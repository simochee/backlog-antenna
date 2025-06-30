import type { Meta, StoryObj } from "@storybook/react-vite";
import { IssueItemSkeleton } from "./index";

/**
 * 課題アイテムのスケルトンコンポーネントのStorybook定義
 */
const meta = {
	component: IssueItemSkeleton,
	tags: ["autodocs"],
	title: "Components/IssueItemSkeleton",
} satisfies Meta<typeof IssueItemSkeleton>;

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
			<IssueItemSkeleton />
			<IssueItemSkeleton />
			<IssueItemSkeleton />
			<IssueItemSkeleton />
			<IssueItemSkeleton />
		</div>
	),
};

/**
 * ホバー効果付きでのスケルトン表示
 */
export const WithHover: Story = {
	render: () => (
		<div className="hover:bg-yellow-50">
			<IssueItemSkeleton />
		</div>
	),
};

/**
 * 実際のIssueItemと比較用
 */
export const Comparison: Story = {
	render: () => (
		<div className="space-y-4">
			<div>
				<h3 className="mb-2 font-medium text-gray-700 text-sm">
					スケルトン状態
				</h3>
				<div className="rounded border">
					<IssueItemSkeleton />
				</div>
			</div>
			<div>
				<h3 className="mb-2 font-medium text-gray-700 text-sm">
					複数スケルトン
				</h3>
				<div className="rounded border">
					<IssueItemSkeleton />
					<IssueItemSkeleton />
					<IssueItemSkeleton />
				</div>
			</div>
		</div>
	),
};
