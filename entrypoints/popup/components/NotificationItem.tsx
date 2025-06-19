import { getStatusText } from "@/utils/notifications";

type NotificationItemProps = {
	notification: any;
};

/**
 * 個別のお知らせアイテムコンポーネント
 */
const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
	const reasonText = getStatusText(notification.reason);
	const createdDate = new Date(notification.created).toLocaleString("ja-JP");

	return (
		<div className={`rounded border p-4 ${
			notification.alreadyRead 
				? "border-gray-200 bg-white" 
				: "border-blue-200 bg-blue-50"
		}`}>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						{!notification.alreadyRead && (
							<span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
						)}
						<span className="text-sm font-medium text-blue-600">
							{reasonText}
						</span>
					</div>
					
					<h3 className="font-semibold text-gray-900 mb-1">
						{notification.issue?.summary || notification.pullRequest?.summary || "詳細なし"}
					</h3>
					
					<div className="text-sm text-gray-600 space-y-1">
						{notification.project && (
							<div>
								プロジェクト: {notification.project.name} ({notification.project.projectKey})
							</div>
						)}
						
						{notification.issue && (
							<div>
								課題: {notification.issue.issueKey}
							</div>
						)}
						
						{notification.sender && (
							<div>
								送信者: {notification.sender.name}
							</div>
						)}
						
						<div>
							日時: {createdDate}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationItem;