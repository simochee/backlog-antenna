import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Entity } from "backlog-js";
import { NotificationItem } from "./index";

/**
 * 通知アイテムコンポーネントのStorybook定義
 */
const meta = {
	argTypes: {
		notification: {
			description: "表示する通知データ",
		},
	},
	component: NotificationItem,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	title: "Components/NotificationItem",
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な通知データのモック
const baseNotification: Entity.Notification.Notification = {
	alreadyRead: false,
	comment: null,
	created: "2024-01-01T12:00:00Z",
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
		issueKey: "TEST-1",
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
			color: "#ed8077",
			displayOrder: 1,
			id: 1,
			name: "未対応",
			projectId: 1,
		},
		summary: "サンプル課題",
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
		projectKey: "TEST",
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
	reason: 1,
	resourceAlreadyRead: false,
	sender: {
		id: 2,
		lang: "ja",
		mailAddress: "sender@example.com",
		name: "送信者",
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

/**
 * 担当者に設定された通知
 */
export const AssignedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 1,
		},
	},
};

/**
 * コメントされた通知
 */
export const CommentedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			comment: {
				changeLog: [],
				content: "コメントの内容です",
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
			},
			reason: 2,
		},
	},
};

/**
 * 課題が追加された通知
 */
export const IssueAddedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 3,
		},
	},
};

/**
 * 課題が更新された通知
 */
export const IssueUpdatedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 4,
		},
	},
};

/**
 * ファイルが添付された通知
 */
export const FileAttachedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 5,
		},
	},
};

/**
 * プロジェクトに追加された通知
 */
export const ProjectAddedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 6,
		},
	},
};

/**
 * プルリクエストが追加された通知
 */
export const PullRequestAddedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 12,
		},
	},
};

/**
 * プルリクエストが更新された通知
 */
export const PullRequestUpdatedNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 13,
		},
	},
};

/**
 * 不明な理由の通知
 */
export const UnknownReasonNotification: Story = {
	args: {
		notification: {
			...baseNotification,
			reason: 999,
		},
	},
};
