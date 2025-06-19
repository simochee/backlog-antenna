import { createFileRoute } from "@tanstack/react-router";
import { useProjects } from "@/hooks/useProjects";
import { useSpaces } from "@/hooks/useSpaces";

export const Route = createFileRoute("/$spaceDomain/projects")({
	component: ProjectsPage,
});

function ProjectsPage() {
	const { spaceDomain } = Route.useParams();
	const spaces = useSpaces();

	// 現在のスペース情報を取得
	const currentSpace = spaces.items.find(
		(space) => space.spaceDomain === spaceDomain,
	);

	const projects = useProjects(spaceDomain, currentSpace?.apiKey ?? "");

	if (spaces.isLoading) {
		return (
			<div>
				<h2 className="mb-4 font-bold text-gray-800 text-xl">
					プロジェクト一覧
				</h2>
				<div className="text-center text-gray-600">
					スペース情報を読み込み中...
				</div>
			</div>
		);
	}

	if (!currentSpace) {
		return (
			<div>
				<h2 className="mb-4 font-bold text-gray-800 text-xl">
					プロジェクト一覧
				</h2>
				<div className="text-center text-red-600">
					スペース情報が見つかりません
				</div>
			</div>
		);
	}

	if (projects.isLoading) {
		return (
			<div>
				<h2 className="mb-4 font-bold text-gray-800 text-xl">
					プロジェクト一覧
				</h2>
				<div className="text-center text-gray-600">
					プロジェクトを読み込み中...
				</div>
			</div>
		);
	}

	if (projects.error) {
		return (
			<div>
				<h2 className="mb-4 font-bold text-gray-800 text-xl">
					プロジェクト一覧
				</h2>
				<div className="text-center text-red-600">
					プロジェクトの取得に失敗しました
					<button
						className="ml-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
						onClick={() => projects.refetch()}
						type="button"
					>
						再試行
					</button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">プロジェクト一覧</h2>

			{projects.data && projects.data.length > 0 ? (
				<div className="space-y-3">
					{projects.data.map((project) => (
						<div
							className="rounded border border-gray-200 bg-white p-4 shadow-sm"
							key={project.id}
						>
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-gray-900">{project.name}</h3>
								<span className="rounded bg-gray-100 px-2 py-1 text-gray-600 text-sm">
									{project.projectKey}
								</span>
							</div>

							<div className="mt-2 flex flex-wrap gap-2">
								{project.archived && (
									<span className="rounded bg-red-100 px-2 py-1 text-red-700 text-xs">
										アーカイブ済み
									</span>
								)}
								{project.chartEnabled && (
									<span className="rounded bg-blue-100 px-2 py-1 text-blue-700 text-xs">
										チャート有効
									</span>
								)}
								{project.useWiki && (
									<span className="rounded bg-green-100 px-2 py-1 text-green-700 text-xs">
										Wiki使用
									</span>
								)}
								{project.useFileSharing && (
									<span className="rounded bg-purple-100 px-2 py-1 text-purple-700 text-xs">
										ファイル共有
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center text-gray-600">
					プロジェクトがありません
				</div>
			)}
		</div>
	);
}
