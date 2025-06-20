import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Entity } from "backlog-js";
import { NotificationItem } from "./index";

// Storybook用のargs型定義
type StoryArgs = {
	reason: number;
	projectKey: string;
	issueKey: string;
	issueSummary: string;
	statusName: string;
	statusColor: string;
	commentContent?: string;
	senderName: string;
	created: string;
};

/**
 * 通知アイテムコンポーネントのStorybook定義
 */
const meta = {
	component: NotificationItem,
	render: (args: StoryArgs) => {
		// argsをEntity.Notification.Notificationオブジェクトにマッピング
		const notification: Entity.Notification.Notification = {
			alreadyRead: false,
			comment: args.commentContent
				? {
						changeLog: [],
						content: args.commentContent,
						created: "2024-01-01T12:00:00Z",
						createdUser: {
							id: 2,
							lang: "ja",
							mailAddress: "commenter@example.com",
							name: "コメント者",
							roleType: 1,
							userId: "commenter",
						},
						id: 1,
						notifications: [],
						stars: [],
						updated: "2024-01-01T12:00:00Z",
					}
				: null,
			created: args.created,
			id: 1,
			issue: {
				actualHours: null,
				assignee: {
					id: 1,
					lang: "ja",
					mailAddress: "assignee@example.com",
					name: "担当者",
					roleType: 1,
					userId: "user1",
				},
				attachments: [],
				category: [],
				created: "2024-01-01T10:00:00Z",
				createdUser: {
					id: 2,
					lang: "ja",
					mailAddress: "creator@example.com",
					name: "作成者",
					roleType: 1,
					userId: "creator",
				},
				customFields: [],
				description: "これはサンプルの課題です",
				dueDate: null,
				estimatedHours: null,
				id: 1,
				issueKey: args.issueKey,
				issueType: {
					color: "#7ea800",
					displayOrder: 0,
					id: 1,
					name: "タスク",
					projectId: 1,
				},
				keyId: 1,
				milestone: [],
				parentIssueId: null,
				priority: {
					id: 3,
					name: "中",
				},
				projectId: 1,
				resolution: null,
				sharedFiles: [],
				stars: [],
				startDate: null,
				status: {
					color: args.statusColor,
					displayOrder: 1,
					id: 1,
					name: args.statusName,
					projectId: 1,
				},
				summary: args.issueSummary,
				updated: "2024-01-01T11:00:00Z",
				updatedUser: {
					id: 2,
					lang: "ja",
					mailAddress: "updater@example.com",
					name: "更新者",
					roleType: 1,
					userId: "updater",
				},
				versions: [],
			},
			project: {
				archived: false,
				chartEnabled: true,
				displayOrder: 0,
				id: 1,
				name: "テストプロジェクト",
				projectKey: args.projectKey,
				projectLeaderCanEditProjectLeader: true,
				subtaskingEnabled: true,
				textFormattingRule: "markdown",
				useDevAttributes: false,
				useFileSharing: true,
				useResolvedForChart: true,
				useWiki: true,
				useWikiTreeView: true,
			},
			pullRequest: null,
			pullRequestComment: null,
			reason: args.reason,
			resourceAlreadyRead: false,
			sender: {
				id: 2,
				lang: "ja",
				mailAddress: "sender@example.com",
				name: args.senderName,
				roleType: 1,
				userId: "sender1",
			},
			user: {
				id: 1,
				lang: "ja",
				mailAddress: "user1@example.com",
				name: "ユーザー1",
				roleType: 1,
				userId: "user1",
			},
		};

		return <NotificationItem notification={notification} />;
	},
	tags: ["autodocs"],
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

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
