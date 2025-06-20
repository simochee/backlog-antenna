import type { Entity } from "backlog-js";
import { StatusBadge } from "../StatusBadge";

type Props = {
	issue: Entity.Issue.RecentlyViewedIssue;
};

export const IssueItem: React.FC<Props> = ({ issue: { issue } }) => {
	return (
		<button
			type="button"
			className="flex h-20 w-full flex-col justify-center gap-1 px-3 text-left"
		>
			<span className="flex items-center gap-1">
				<StatusBadge color={issue.issueType.color}>
					{issue.issueType.name}
				</StatusBadge>
				<span className="text-slate-700 text-xs">{issue.issueKey}</span>
				<span className="ml-auto">
					<StatusBadge color={issue.status.color}>
						{issue.status.name}
					</StatusBadge>
				</span>
			</span>
			<span className="line-clamp-1">{issue.summary}</span>
			<span className="flex items-center gap-1">
				{issue.assignee && (
					<>
						<img
							className="size-4 rounded-full"
							src="https://placehold.jp/320x320.png"
							alt=""
						/>
						<span>{issue.assignee.name}</span>
					</>
				)}
			</span>
		</button>
	);
};
