import { Backlog } from "backlog-js";
import type { BacklogNotification } from "@/types/backlogNotification";

/**
 * 通知取得のオプション
 */
export type FetchNotificationsOptions = {
	count?: number;
	order?: "asc" | "desc";
	minId?: number;
	maxId?: number;
	senderId?: number;
};

/**
 * 指定されたスペースの通知一覧を取得する
 * @param spaceDomain スペースドメイン
 * @param apiKey APIキー
 * @param options 取得オプション
 * @returns 通知一覧
 */
export const fetchNotifications = async (
	spaceDomain: string,
	apiKey: string,
	options: FetchNotificationsOptions = {},
): Promise<BacklogNotification[]> => {
	try {
		console.log(
			`Fetching notifications from ${spaceDomain} with options:`,
			options,
		);

		const backlog = new Backlog({
			apiKey,
			host: spaceDomain,
		});

		const notifications = await backlog.getNotifications({
			count: 5,
			order: "desc",
			...options,
		});

		console.log(`Successfully fetched ${notifications.length} notifications`);
		return notifications;
	} catch (error) {
		console.error(`Failed to fetch notifications from ${spaceDomain}:`, error);

		// ダミーAPIキーの場合は、開発用のモックデータを返す
		if (apiKey === "dummy-api-key-for-testing") {
			console.log("Using mock data for development");
			return generateMockNotifications(options.count || 5);
		}

		throw error;
	}
};

// 開発用のモックデータ生成
const generateMockNotifications = (count: number): BacklogNotification[] => {
	const mockData: BacklogNotification[] = [];

	for (let i = 0; i < count; i++) {
		mockData.push({
			alreadyRead: i % 3 === 0,
			created: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
			id: 1000 - i,
			issue: {
				id: 100 + i,
				issueKey: `MOCK-${100 + i}`,
				keyId: 100 + i,
				summary: `テスト課題 ${i + 1}`,
			},
			project: {
				id: 1,
				name: "モックプロジェクト",
				projectKey: "MOCK",
			},
			reason: 1,
			sender: {
				id: 1,
				name: "モックユーザー",
				userId: "mockuser",
			},
			updated: new Date(Date.now() - i * 1000 * 60 * 30).toISOString(),
		});
	}

	return mockData;
};
