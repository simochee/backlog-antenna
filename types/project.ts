/**
 * Backlogプロジェクトの基本情報
 */
export type BacklogProject = {
	id: number;
	projectKey: string;
	name: string;
	chartEnabled: boolean;
	subtaskingEnabled: boolean;
	projectLeaderCanEditProjectLeader: boolean;
	useWiki: boolean;
	useFileSharing: boolean;
	useDevAttributes: boolean;
	useResolvedForChart: boolean;
	textFormattingRule: string;
	archived: boolean;
};

/**
 * プロジェクト取得APIのレスポンス型
 */
export type GetProjectsResponse = BacklogProject[];
