import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$spaceKey/projects")({
	component: ProjectsPage,
});

function ProjectsPage() {
	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">プロジェクト一覧</h2>
			{/* プロジェクト一覧のコンテンツエリア */}
		</div>
	);
}
