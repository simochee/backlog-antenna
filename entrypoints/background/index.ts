import { Backlog } from "backlog-js";
import { browser } from "wxt/browser";
import { getSpaces, watchSpaces } from "@/storages/spaces";

const browserAction = browser.action ?? browser.browserAction;

export default defineBackground({
	main: () => {
		browserAction.setBadgeTextColor({ color: "#ffffff" });

		const setBadgeText = (count: number) => {
			if (count <= 0) {
				browserAction.setBadgeText({ text: undefined });
				return;
			}

			const text = `${count}`;
			browserAction.setBadgeText({ text });
		};

		const updateNotificationCount = async () => {
			try {
				const spaces = await getSpaces();
				const countBySpaces = await Promise.all(
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
							return count;
						} catch {
							return null;
						}
					}),
				);
				const hasError = countBySpaces.some((count) => count === null);
				const totalCount = countBySpaces
					.filter((count): count is number => count !== null)
					.reduce((sum, count) => sum + count, 0);

				setBadgeText(totalCount);
				browserAction.setBadgeBackgroundColor({
					color: hasError ? "#ffb219" : "#fe1aaf",
				});
			} catch {
				browserAction.setBadgeText({ text: "!" });
				browserAction.setBadgeBackgroundColor({ color: "#ffb219" });
			}
		};

		browser.alarms.create({ periodInMinutes: 1 });
		browser.alarms.onAlarm.addListener(updateNotificationCount);
		watchSpaces(updateNotificationCount);

		updateNotificationCount();
	},
	type: "module",
});
