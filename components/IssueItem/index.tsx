import type { Entity } from "backlog-js";
import { useCurrentSpace } from "@/hooks/useCurrentSpace";
import { BacklogImage } from "../BacklogImage";
import { StatusBadge } from "../StatusBadge";
import { TabLink } from "../TabLink";

type Props = {
	issue: Entity.Issue.RecentlyViewedIssue;
};

export const IssueItem: React.FC<Props> = ({ issue: { issue } }) => {
	const { spaceDomain } = useCurrentSpace();

	return (
		<TabLink
			href={`https://${spaceDomain}/view/${issue.issueKey}`}
			className="flex h-20 w-full flex-col justify-center gap-1 px-3 text-left hover:bg-yellow-50"
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
						<BacklogImage
							className="size-4 rounded-full object-cover"
							path={`/api/v2/users/${issue.assignee.id}/icon`}
							alt=""
						/>
						<span>{issue.assignee.name}</span>
					</>
				)}
			</span>
		</TabLink>
	);
};
