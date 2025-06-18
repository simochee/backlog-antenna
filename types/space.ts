/**
 * Backlogスペースの基本情報
 */
export type BacklogSpace = {
	spaceDomain: string;
	suppressNotification?: boolean;
	excludeBadge?: boolean;
};

/**
 * Backlog API キー認証情報
 */
export type BacklogApiKey = {
	apiKey: string;
};

/**
 * Backlog OAuth2 トークン認証情報
 */
export type BacklogOauth2Token = {
	accessToken: string;
	refreshToken: string;
};

/**
 * 認証情報付きのBacklogスペース情報
 */
export type BacklogSpaceWithAuthorization = BacklogSpace &
	(BacklogApiKey | BacklogOauth2Token);
