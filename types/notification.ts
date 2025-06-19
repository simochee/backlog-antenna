/**
 * 通知件数の取得状態
 */
export type NotificationStatus = "success" | "failed";

/**
 * スペースごとの通知件数情報
 */
export type NotificationCount = {
	count: number;
	updatedAt: number;
	status: NotificationStatus;
};

/**
 * すべてのスペースの通知件数を格納するオブジェクト
 * キー: スペースドメイン名
 * 値: 通知件数情報
 */
export type NotificationCounts = Record<string, NotificationCount>;
