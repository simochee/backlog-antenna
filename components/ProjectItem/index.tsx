import type { Entity } from "backlog-js";

type Props = {
	project: Entity.Project.Project;
};

export const ProjectItem: React.FC<Props> = ({ project }) => {
	const navItems = [
		{ action: "add", enabled: true, label: "課題の追加" },
		{ action: "find", enabled: true, label: "課題" },
		{ action: "wiki", enabled: project.useWiki, label: "Wiki" },
		{ action: "file", enabled: project.useFileSharing, label: "ファイル" },
		{
			action: "subversion",
			enabled: project.useSubversion,
			label: "Subversion",
		},
		{ action: "git", enabled: project.useGit, label: "Git" },
	].filter(({ enabled }) => enabled);

	return (
		<button
			className="grid w-full grid-cols-[auto_1fr] gap-y-1 p-4 hover:bg-yellow-50"
			type="button"
		>
			<img
				alt=""
				className="h-7 w-7 object-cover"
				src="https://placehold.jp/320x320.png"
			/>
			<span className="flex items-end gap-1 self-center px-3 text-sm leading-none">
				<span className="line-clamp-1">{project.name}</span>
				<span className="text-2xs">({project.projectKey})</span>
			</span>
			<span className="col-start-2 flex flex-wrap">
				{navItems.map(({ action, label }) => (
					<button
						className="border-gray-300 border-r px-3 text-gray-500 text-xs leading-tight last:border-0 hover:text-black hover:underline"
						key={action}
						type="button"
					>
						{label}
					</button>
				))}
			</span>
		</button>
	);
};
