import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationItem } from "./index";

/**
 * 通知アイテムコンポーネントのStorybook定義
 */
const meta = {
	component: NotificationItem,
	tags: ["autodocs"],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な通知データ
const baseArgs = {
	commentContent: undefined,
	created: "2024-01-01T12:00:00Z",
	issueKey: "TEST-1",
	issueSummary: "サンプル課題",
	projectKey: "TEST",
	reason: 1,
	senderName: "送信者",
	statusColor: "#ed8077",
	statusName: "未対応",
};

/**
 * 担当者に設定された通知
 */
export const AssignedNotification: Story = {
	args: {
		...baseArgs,
		reason: 1,
	},
};

/**
 * コメントされた通知
 */
export const CommentedNotification: Story = {
	args: {
		...baseArgs,
		commentContent: "コメントの内容です",
		reason: 2,
	},
};

/**
 * 課題が追加された通知
 */
export const IssueAddedNotification: Story = {
	args: {
		...baseArgs,
		reason: 3,
	},
};

/**
 * 課題が更新された通知
 */
export const IssueUpdatedNotification: Story = {
	args: {
		...baseArgs,
		reason: 4,
	},
};

/**
 * ファイルが添付された通知
 */
export const FileAttachedNotification: Story = {
	args: {
		...baseArgs,
		reason: 5,
	},
};

/**
 * プロジェクトに追加された通知
 */
export const ProjectAddedNotification: Story = {
	args: {
		...baseArgs,
		reason: 6,
	},
};

/**
 * プルリクエストが追加された通知
 */
export const PullRequestAddedNotification: Story = {
	args: {
		...baseArgs,
		reason: 12,
	},
};

/**
 * プルリクエストが更新された通知
 */
export const PullRequestUpdatedNotification: Story = {
	args: {
		...baseArgs,
		reason: 13,
	},
};

/**
 * 不明な理由の通知
 */
export const UnknownReasonNotification: Story = {
	args: {
		...baseArgs,
		reason: 999,
	},
};
