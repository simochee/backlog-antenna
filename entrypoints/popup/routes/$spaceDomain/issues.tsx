import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useIssues } from "@/hooks/useIssues";

export const Route = createFileRoute("/$spaceDomain/issues")({
	component: IssuesPage,
});

function IssuesPage() {
	const {
		items: issues,
		isLoading,
		error,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useIssues();

	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 }
		);

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (error) {
		return (
			<div className="p-4">
				<h2 className="mb-4 font-bold text-gray-800 text-xl">最近見た課題</h2>
				<div className="text-red-600">
					エラーが発生しました: {error.message}
				</div>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h2 className="mb-4 font-bold text-gray-800 text-xl">最近見た課題</h2>
			
			{isLoading ? (
				<div className="text-gray-600">読み込み中...</div>
			) : (
				<>
					<div className="space-y-2">
						{issues.map((issue) => (
							<div
								key={issue.id}
								className="border rounded-lg p-3 hover:bg-gray-50"
							>
								<div className="font-medium text-sm">
									{issue.issueKey}
								</div>
								<div className="text-gray-900 text-sm">
									{issue.summary}
								</div>
								<div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
									<span>{issue.status?.name}</span>
									<span>•</span>
									<span>{issue.assignee?.name || "未割り当て"}</span>
								</div>
							</div>
						))}
					</div>

					{hasNextPage && (
						<div
							ref={loadMoreRef}
							className="py-4 text-center text-gray-600 text-sm"
						>
							{isFetchingNextPage ? "読み込み中..." : ""}
						</div>
					)}

					{!hasNextPage && issues.length > 0 && (
						<div className="py-4 text-center text-gray-500 text-sm">
							すべての課題を表示しました
						</div>
					)}
				</>
			)}
		</div>
	);
}
