import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$spaceDomain/issues")({
	component: IssuesPage,
});

function IssuesPage() {
	return (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">最近見た課題</h2>
			{/* 課題一覧のコンテンツエリア */}
		</div>
	);
}
