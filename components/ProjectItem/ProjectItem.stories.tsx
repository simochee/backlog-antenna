import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Entity } from "backlog-js";
import { ProjectItem } from "./index";

// Storybook用のargs型定義
type StoryArgs = {
	name: string;
	projectKey: string;
	useWiki: boolean;
	useFileSharing: boolean;
	useSubversion: boolean;
	useGit: boolean;
};

/**
 * プロジェクトアイテムコンポーネントのStorybook定義
 */
const meta = {
	render: (args: StoryArgs) => {
		// argsをEntity.Project.Projectオブジェクトにマッピング
		const project: Entity.Project.Project = {
			archived: false,
			chartEnabled: true,
			displayOrder: 0,
			id: 1,
			name: args.name,
			projectKey: args.projectKey,
			projectLeaderCanEditProjectLeader: true,
			subtaskingEnabled: true,
			textFormattingRule: "markdown",
			useDevAttributes: false,
			useFileSharing: args.useFileSharing,
			useGit: args.useGit,
			useResolvedForChart: true,
			useSubversion: args.useSubversion,
			useWiki: args.useWiki,
			useWikiTreeView: true,
		};

		return <ProjectItem project={project} />;
	},
	tags: ["autodocs"],
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

// 基本的なプロジェクトデータ
const baseArgs = {
	name: "サンプルプロジェクト",
	projectKey: "SAMPLE",
	useFileSharing: true,
	useGit: false,
	useSubversion: false,
	useWiki: true,
};

/**
 * 基本的なプロジェクト（全機能有効）
 */
export const DefaultProject: Story = {
	args: {
		...baseArgs,
		useFileSharing: true,
		useGit: true,
		useSubversion: true,
		useWiki: true,
	},
};

/**
 * 最小構成のプロジェクト（Wiki、ファイル共有、Git、Subversion無効）
 */
export const MinimalProject: Story = {
	args: {
		...baseArgs,
		name: "最小構成プロジェクト",
		projectKey: "MIN",
		useFileSharing: false,
		useGit: false,
		useSubversion: false,
		useWiki: false,
	},
};

/**
 * Wiki有効プロジェクト
 */
export const WikiEnabledProject: Story = {
	args: {
		...baseArgs,
		name: "Wiki使用プロジェクト",
		projectKey: "WIKI",
		useFileSharing: false,
		useGit: false,
		useSubversion: false,
		useWiki: true,
	},
};

/**
 * ファイル共有有効プロジェクト
 */
export const FileSharingEnabledProject: Story = {
	args: {
		...baseArgs,
		name: "ファイル共有プロジェクト",
		projectKey: "FILE",
		useFileSharing: true,
		useGit: false,
		useSubversion: false,
		useWiki: false,
	},
};

/**
 * Git有効プロジェクト
 */
export const GitEnabledProject: Story = {
	args: {
		...baseArgs,
		name: "Git使用プロジェクト",
		projectKey: "GIT",
		useFileSharing: false,
		useGit: true,
		useSubversion: false,
		useWiki: false,
	},
};

/**
 * Subversion有効プロジェクト
 */
export const SubversionEnabledProject: Story = {
	args: {
		...baseArgs,
		name: "SVN使用プロジェクト",
		projectKey: "SVN",
		useFileSharing: false,
		useGit: false,
		useSubversion: true,
		useWiki: false,
	},
};

/**
 * 長いプロジェクト名
 */
export const LongNameProject: Story = {
	args: {
		...baseArgs,
		name: "非常に長いプロジェクト名を持つプロジェクトのサンプルケース",
		projectKey: "LONG_NAME_PROJ",
		useFileSharing: true,
		useGit: true,
		useSubversion: false,
		useWiki: true,
	},
};

/**
 * アーカイブ済みプロジェクト
 */
export const ArchivedProject: Story = {
	args: {
		...baseArgs,
		name: "アーカイブ済みプロジェクト",
		projectKey: "ARCH",
		useFileSharing: true,
		useGit: false,
		useSubversion: false,
		useWiki: true,
	},
};
