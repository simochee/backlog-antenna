import { Backlog } from "backlog-js";
import { browser } from "wxt/browser";
import {
	deleteNotificationCount,
	getNotificationCounts,
	updateNotificationCount,
	watchNotificationCounts,
} from "@/storages/notifications";
import { getSpaces, watchSpaces } from "@/storages/spaces";

const browserAction = browser.action ?? browser.browserAction;

export default defineBackground({
	main: () => {
		browserAction.setBadgeTextColor({ color: "#ffffff" });

		const updateBadge = async () => {
			try {
				const counts = await getNotificationCounts();
				const hasError = Object.values(counts).some(
					({ status }) => status === "failed",
				);
				const totalCount = Object.values(counts)
					.filter(({ status }) => status === "success")
					.reduce((sum, { count }) => sum + count, 0);

				if (totalCount <= 0) {
					browserAction.setBadgeText({ text: undefined });
				} else {
					browserAction.setBadgeText({ text: `${totalCount}` });
				}

				browserAction.setBadgeBackgroundColor({
					color: hasError ? "#ffb219" : "#fe1aaf",
				});
			} catch {
				browserAction.setBadgeText({ text: "!" });
				browserAction.setBadgeBackgroundColor({ color: "#ffb219" });
			}
		};

		const fetchNotificationCounts = async () => {
			const spaces = await getSpaces();
			const currentCounts = await getNotificationCounts();
			const spaceDomains = spaces.map(({ spaceDomain }) => spaceDomain);

			// 存在しないスペースの通知キーを削除
			await Promise.all(
				Object.keys(currentCounts)
					.filter((domain) => !spaceDomains.includes(domain))
					.map((domain) => deleteNotificationCount(domain)),
			);

			// 各スペースの通知件数を取得・更新
			await Promise.all(
				spaces.map(async ({ spaceDomain, apiKey }) => {
					try {
						const backlog = new Backlog({
							apiKey: apiKey,
							host: spaceDomain,
						});
						const { count } = await backlog.getNotificationsCount({
							alreadyRead: false,
							resourceAlreadyRead: false,
						});
						await updateNotificationCount(spaceDomain, {
							count,
							status: "success",
							updatedAt: Date.now(),
						});
					} catch {
						await updateNotificationCount(spaceDomain, {
							count: 0,
							status: "failed",
							updatedAt: Date.now(),
						});
					}
				}),
			);
		};

		browser.alarms.create({ periodInMinutes: 1 });
		browser.alarms.onAlarm.addListener(fetchNotificationCounts);
		watchSpaces(fetchNotificationCounts);
		watchNotificationCounts(updateBadge);

		fetchNotificationCounts();
	},
	type: "module",
});
