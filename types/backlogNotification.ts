/**
 * Backlogお知らせ情報の型定義
 */
export type BacklogNotification = {
	id: number;
	alreadyRead: boolean;
	reason: number;
	user?: {
		id: number;
		userId: string;
		name: string;
	};
	project?: {
		id: number;
		projectKey: string;
		name: string;
	};
	issue?: {
		id: number;
		issueKey: string;
		keyId: number;
		summary: string;
	};
	comment?: {
		id: number;
		content: string;
	};
	created: string;
	updated: string;
};
