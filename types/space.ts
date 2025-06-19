/**
 * Backlogスペースの基本情報
 */
export type BacklogSpace = {
	spaceDomain: string;
	apiKey: string;
	suppressNotification?: boolean;
	excludeBadge?: boolean;
};
