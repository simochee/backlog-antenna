import type { Entity } from "backlog-js";
import { useCurrentSpace } from "@/hooks/useCurrentSpace";
import { StatusBadge } from "../StatusBadge";

type Props = {
	issue: Entity.Issue.RecentlyViewedIssue;
};

export const IssueItem: React.FC<Props> = ({ issue: { issue } }) => {
	const { apiKey, spaceDomain } = useCurrentSpace();

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
							alt=""
							className="h-4 rounded-full object-cover"
							src={`https://${spaceDomain}/api/v2/users/${issue.assignee.id}/icon?apiKey=${apiKey}`}
						/>
						<span>{issue.assignee.name}</span>
					</>
				)}
			</span>
		</button>
	);
};
