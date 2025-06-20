import type { Entity } from "backlog-js";
import { clsx } from "clsx";
import TimeAgo from "javascript-time-ago";
import ja from "javascript-time-ago/locale/ja";
import tinycolor from "tinycolor2";
import { useCurrentSpace } from "@/hooks/useCurrentSpace";
import { BacklogImage } from "../BacklogImage";
import { TabLink } from "../TabLink";

TimeAgo.addLocale(ja);
const timeAgo = new TimeAgo("ja-JP");

/** ステータスメッセージのテキストを取得 */
const getReasonText = (reason: number): [string, string, string] => {
	switch (reason) {
		case 1:
		case 10:
			return ["", "担当者", "に設定しました。"];
		case 2:
		case 11:
			return ["", "コメント", "しました。"];
		case 3:
			return ["課題を", "追加", "しました。"];
		case 4:
			return ["課題を", "更新", "しました。"];
		case 5:
			return ["ファイルを", "添付", "しました。"];
		case 6:
			return ["プロジェクトに", "追加", "しました。"];
		case 12:
			return ["プルリクエストを", "追加", "しました。"];
		case 13:
			return ["プルリクエストを", "更新", "しました。"];
		default:
			return ["", "お知らせ", "しました。"];
	}
};

type Props = {
	notification: Entity.Notification.Notification;
};

export const NotificationItem: React.FC<Props> = ({ notification }) => {
	const { spaceDomain } = useCurrentSpace();
	const path = notification.pullRequest
		? `/git/${notification.project.projectKey}/app/pullRequests/${notification.pullRequest.number}`
		: notification.issue
			? `/view/${notification.issue.issueKey}`
			: `/projects/${notification.project.projectKey}`;

	const reasonText = getReasonText(notification.reason);

	return (
		<TabLink
			href={`https://${spaceDomain}${path}`}
			className="grid grid-cols-[1fr_auto] gap-3 px-4 py-2 hover:bg-yellow-50"
		>
			<div className="grid gap-1">
				<div className="flex items-center gap-1">
					<BacklogImage
						className="size-4 rounded-full object-cover"
						path={`/api/v2/users/${notification.sender.id}/icon`}
						alt=""
					/>
					<p className="line-clamp-1 text-gray-500 text-xs">
						{notification.sender.name} さんが{reasonText[0]}{" "}
						<span
							className={
								[6, 10, 11, 12, 13].includes(notification.reason)
									? "text-pink-600"
									: "text-brand-600"
							}
						>
							{reasonText[1]}
						</span>{" "}
						{reasonText[2]}
					</p>
				</div>
				<p className="line-clamp-1 text-sm">
					{notification.issue
						? notification.issue.summary
						: notification.pullRequest
							? notification.pullRequest.summary
							: notification.project.name}
				</p>
				<p className="line-clamp-1 text-gray-500 text-xs">
					{notification.issue
						? `${notification.project.projectKey}_${notification.issue.issueKey}`
						: notification.project.projectKey}
				</p>
			</div>
			<div className="flex flex-col items-end gap-1">
				<time className="text-gray-500 text-xs" dateTime={notification.created}>
					{timeAgo.format(new Date(notification.created), "round-minute")}
				</time>
				{notification.issue && (
					<p
						className={clsx(
							"line-clamp-1 max-w-32 rounded-full px-2 text-center text-xs leading-relaxed",
							tinycolor(notification.issue.status.color).getLuminance() < 0.5
								? "text-white"
								: "text-black",
						)}
						style={{ backgroundColor: notification.issue.status.color }}
					>
						{notification.issue.status.name}
					</p>
				)}
			</div>
		</TabLink>
	);
};
