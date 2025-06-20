import type { Entity } from "backlog-js";
import { useCurrentSpace } from "@/hooks/useCurrentSpace";
import { BacklogImage } from "../BacklogImage";
import { TabLink } from "../TabLink";

type Props = {
	project: Entity.Project.Project;
};

export const ProjectItem: React.FC<Props> = ({ project }) => {
	const { spaceDomain } = useCurrentSpace();

	const navItems = [
		{ path: `/add/${project.projectKey}`, enabled: true, label: "課題の追加" },
		{ path: `/find/${project.projectKey}`, enabled: true, label: "課題" },
		{
			path: `/wiki/${project.projectKey}`,
			enabled: project.useWiki,
			label: "Wiki",
		},
		{
			path: `/file/${project.projectKey}`,
			enabled: project.useFileSharing,
			label: "ファイル",
		},
		{
			path: `/subversion/${project.projectKey}`,
			enabled: project.useSubversion,
			label: "Subversion",
		},
		{
			path: `/git/${project.projectKey}`,
			enabled: project.useGit,
			label: "Git",
		},
	].filter(({ enabled }) => enabled);

	return (
		<TabLink
			href={`https://${spaceDomain}/projects/${project.projectKey}`}
			className="grid w-full grid-cols-[auto_1fr] gap-y-1 p-4 hover:bg-yellow-50"
		>
			<BacklogImage
				className="size-7 object-cover"
				path={`/api/v2/projects/${project.id}/icon`}
				alt=""
			/>
			<span className="flex items-end gap-1 self-center px-3 text-sm leading-normal">
				<span className="line-clamp-1">{project.name}</span>
				<span className="text-2xs">({project.projectKey})</span>
			</span>
			<span className="col-start-2 flex flex-wrap">
				{navItems.map(({ path, label }) => (
					<TabLink
						key={path}
						href={`https://${spaceDomain}${path}`}
						className="border-gray-300 border-r px-3 text-gray-500 text-xs leading-tight last:border-0 hover:text-black hover:underline"
					>
						{label}
					</TabLink>
				))}
			</span>
		</TabLink>
	);
};
