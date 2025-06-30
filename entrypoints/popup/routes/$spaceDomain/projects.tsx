import { createFileRoute } from "@tanstack/react-router";
import { Backlog } from "backlog-js";
import { NotificationSkeleton } from "@/components/NotificationSkeleton";
import { ProjectItem } from "@/components/ProjectItem";
import { SkeltonList } from "@/components/SkeltonList";
import { getSpaces } from "@/storages/spaces";

export const Route = createFileRoute("/$spaceDomain/projects")({
	loader: async ({ params: { spaceDomain } }) => {
		const spaces = await getSpaces();
		const currentSpace = spaces.find(
			(space) => space.spaceDomain === spaceDomain,
		);

		if (!currentSpace) {
			throw new Error(`Space with domain ${spaceDomain} not found`);
		}

		const backlog = new Backlog({
			apiKey: currentSpace.apiKey,
			host: spaceDomain,
		});

		const projects = await backlog.getProjects();
		return { projects };
	},
	component: () => {
		const { projects } = Route.useLoaderData();

		return (
			<div className="scrollbar-brand overflow-scroll py-2 pr-1 pl-2">
				<ul className="rounded border-1 border-gray-300 bg-white">
					{projects.map((project) => (
						<li
							key={project.id}
							className="border-gray-300 not-first:border-t even:bg-gray-50"
						>
							<ProjectItem project={project} />
						</li>
					))}
				</ul>
			</div>
		);
	},
	pendingComponent: () => (
		<SkeltonList length={8}>
			<NotificationSkeleton />
		</SkeltonList>
	),
});
