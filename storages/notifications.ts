import { storage } from "#imports";
import type {
	NotificationCount,
	NotificationCounts,
} from "@/types/notification";

const notifications = storage.defineItem<NotificationCounts>(
	"local:notifications",
	{
		fallback: {},
	},
);

/**
 * 保存されているすべての通知件数を取得する
 * @returns すべてのスペースの通知件数情報
 */
export const getNotificationCounts = () => notifications.getValue();

/**
 * 指定されたスペースの通知件数を更新する
 * @param spaceDomain 更新対象のスペースドメイン
 * @param notificationCount 通知件数情報
 */
export const updateNotificationCount = async (
	spaceDomain: string,
	notificationCount: NotificationCount,
) => {
	const currentCounts = await notifications.getValue();
	currentCounts[spaceDomain] = notificationCount;
	await notifications.setValue(currentCounts);
};

/**
 * 指定されたスペースの通知件数を削除する
 * @param spaceDomain 削除対象のスペースドメイン
 */
export const deleteNotificationCount = async (spaceDomain: string) => {
	const currentCounts = await notifications.getValue();
	delete currentCounts[spaceDomain];
	await notifications.setValue(currentCounts);
};

/**
 * 通知件数の変更を監視する
 * @param callback 通知件数が変更された際に実行されるコールバック関数
 * @returns 監視を停止するための関数
 */
export const watchNotificationCounts = (
	callback: (
		newCounts: NotificationCounts,
		oldCounts: NotificationCounts,
	) => void,
) => {
	return notifications.watch(callback);
};
