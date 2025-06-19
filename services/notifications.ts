import { Backlog } from "backlog-js";
import type { BacklogNotification } from "@/types/notification";

/**
 * 指定されたスペースの通知一覧を取得する
 * @param spaceDomain スペースドメイン
 * @param apiKey APIキー
 * @param count 取得件数（デフォルト: 5）
 * @returns 通知一覧
 */
export const fetchNotifications = async (
	spaceDomain: string,
	apiKey: string,
	count: number = 5,
): Promise<BacklogNotification[]> => {
	const backlog = new Backlog({
		apiKey,
		host: spaceDomain,
	});

	const notifications = await backlog.getNotifications({
		count,
		order: "desc",
	});

	return notifications;
};
