import type { Notification } from "backlog-js";
import { getStatusText } from "@/utils/backlog";

type Props = {
	notification: Notification;
};

/**
 * 個別のお知らせアイテムコンポーネント
 */
const NotificationItem: React.FC<Props> = ({ notification }) => {
	const reasonText = getStatusText(notification.reason);
	const createdDate = new Date(notification.created).toLocaleString("ja-JP");

	return (
		<div
			className={`rounded border p-4 ${
				notification.alreadyRead
					? "border-gray-200 bg-white"
					: "border-blue-200 bg-blue-50"
			}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="mb-2 flex items-center gap-2">
						{!notification.alreadyRead && (
							<span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
						)}
						<span className="font-medium text-blue-600 text-sm">
							{reasonText}
						</span>
					</div>

					<h3 className="mb-1 font-semibold text-gray-900">
						{notification.issue?.summary ||
							notification.pullRequest?.summary ||
							"詳細なし"}
					</h3>

					<div className="space-y-1 text-gray-600 text-sm">
						{notification.project && (
							<div>
								プロジェクト: {notification.project.name} (
								{notification.project.projectKey})
							</div>
						)}

						{notification.issue && (
							<div>課題: {notification.issue.issueKey}</div>
						)}

						{notification.sender && (
							<div>送信者: {notification.sender.name}</div>
						)}

						<div>日時: {createdDate}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationItem;
