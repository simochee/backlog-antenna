import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Entity } from "backlog-js";
import { ProjectItem } from "./index";

/**
 * プロジェクトアイテムコンポーネントのStorybook定義
 */
const meta = {
	component: ProjectItem,
	tags: ["autodocs"],
} satisfies Meta<typeof ProjectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なプロジェクトデータのモック
const baseProject: Entity.Project.Project = {
	archived: false,
	chartEnabled: true,
	displayOrder: 0,
	id: 1,
	name: "サンプルプロジェクト",
	projectKey: "SAMPLE",
	projectLeaderCanEditProjectLeader: true,
	subtaskingEnabled: true,
	textFormattingRule: "markdown",
	useDevAttributes: false,
	useFileSharing: true,
	useGit: false,
	useResolvedForChart: true,
	useSubversion: false,
	useWiki: true,
	useWikiTreeView: true,
};

/**
 * 基本的なプロジェクト（全機能有効）
 */
export const DefaultProject: Story = {
	args: {
		project: {
			...baseProject,
			useFileSharing: true,
			useGit: true,
			useSubversion: true,
			useWiki: true,
		},
	},
};

/**
 * 最小構成のプロジェクト（Wiki、ファイル共有、Git、Subversion無効）
 */
export const MinimalProject: Story = {
	args: {
		project: {
			...baseProject,
			name: "最小構成プロジェクト",
			projectKey: "MIN",
			useFileSharing: false,
			useGit: false,
			useSubversion: false,
			useWiki: false,
		},
	},
};

/**
 * Wiki有効プロジェクト
 */
export const WikiEnabledProject: Story = {
	args: {
		project: {
			...baseProject,
			name: "Wiki使用プロジェクト",
			projectKey: "WIKI",
			useFileSharing: false,
			useGit: false,
			useSubversion: false,
			useWiki: true,
		},
	},
};

/**
 * ファイル共有有効プロジェクト
 */
export const FileSharingEnabledProject: Story = {
	args: {
		project: {
			...baseProject,
			name: "ファイル共有プロジェクト",
			projectKey: "FILE",
			useFileSharing: true,
			useGit: false,
			useSubversion: false,
			useWiki: false,
		},
	},
};

/**
 * Git有効プロジェクト
 */
export const GitEnabledProject: Story = {
	args: {
		project: {
			...baseProject,
			name: "Git使用プロジェクト",
			projectKey: "GIT",
			useFileSharing: false,
			useGit: true,
			useSubversion: false,
			useWiki: false,
		},
	},
};

/**
 * Subversion有効プロジェクト
 */
export const SubversionEnabledProject: Story = {
	args: {
		project: {
			...baseProject,
			name: "SVN使用プロジェクト",
			projectKey: "SVN",
			useFileSharing: false,
			useGit: false,
			useSubversion: true,
			useWiki: false,
		},
	},
};

/**
 * 長いプロジェクト名
 */
export const LongNameProject: Story = {
	args: {
		project: {
			...baseProject,
			name: "非常に長いプロジェクト名を持つプロジェクトのサンプルケース",
			projectKey: "LONG_NAME_PROJ",
			useFileSharing: true,
			useGit: true,
			useSubversion: false,
			useWiki: true,
		},
	},
};

/**
 * アーカイブ済みプロジェクト
 */
export const ArchivedProject: Story = {
	args: {
		project: {
			...baseProject,
			archived: true,
			name: "アーカイブ済みプロジェクト",
			projectKey: "ARCH",
			useFileSharing: true,
			useGit: false,
			useSubversion: false,
			useWiki: true,
		},
	},
};
