import type { BacklogNotification } from "@/types/notification";

type Props = {
	notification: BacklogNotification;
};

/**
 * 通知アイテムコンポーネント
 */
export const NotificationItem: React.FC<Props> = ({ notification }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("ja-JP", {
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			month: "short",
		});
	};

	return (
		<div
			className={`border-gray-200 border-b p-4 ${
				notification.alreadyRead ? "bg-gray-50" : "bg-white"
			}`}
		>
			<div className="flex items-start space-x-3">
				<div className="min-w-0 flex-1">
					<div className="flex items-center space-x-2">
						<span className="font-medium text-blue-600 text-sm">
							{notification.project.name}
						</span>
						{!notification.alreadyRead && (
							<span className="h-2 w-2 rounded-full bg-red-500"></span>
						)}
					</div>

					{notification.issue && (
						<p className="mt-1 text-gray-900 text-sm">
							{notification.issue.issueKey}: {notification.issue.summary}
						</p>
					)}

					<div className="mt-2 flex items-center justify-between">
						<span className="text-gray-500 text-xs">
							{notification.user.name}
						</span>
						<span className="text-gray-500 text-xs">
							{formatDate(notification.created)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
