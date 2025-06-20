import { createFileRoute } from "@tanstack/react-router";
import { Backlog } from "backlog-js";
import { ProjectItem } from "@/components/ProjectItem";
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
			<ul>
				{projects.map((project) => (
					<ProjectItem key={project.id} project={project} />
				))}
			</ul>
		);
	},
	pendingComponent: () => (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">プロジェクト一覧</h2>
			<div className="text-center text-gray-600">
				プロジェクトを読み込み中...
			</div>
		</div>
	),
});
