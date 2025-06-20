import type { Entity } from "backlog-js";
import { useCurrentSpace } from "@/hooks/useCurrentSpace";
import { ActionButtons } from "../ActionButtons";
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
			<ActionButtons
				buttons={navItems.map(({ path, label }) => ({
					children: label,
					href: `https://${spaceDomain}${path}`,
				}))}
			/>
		</TabLink>
	);
};
