import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useSpaces } from "@/hooks/useSpaces";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	const spaces = useSpaces();

	if (spaces.isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="text-gray-600 text-lg">読み込み中...</div>
				</div>
			</div>
		);
	}

	// スペースが存在しない場合はオプションページに遷移させる想定
	// TODO: 実際のオプションページ実装後に適切なページに遷移
	if (spaces.items.length === 0) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="text-center">
					<h2 className="mb-2 font-semibold text-gray-900 text-xl">
						スペースが設定されていません
					</h2>
					<p className="text-gray-600">
						オプションページでスペースを追加してください。
					</p>
				</div>
			</div>
		);
	}

	// TODO: storage.localから最後に表示していたルートを取得してリダイレクト
	// 今は最初のスペースのnotificationsページにリダイレクト
	const firstSpace = spaces.items[0];
	return (
		<Navigate
			params={{ spaceDomain: firstSpace.spaceDomain }}
			replace
			to="/$spaceDomain/notifications"
		/>
	);
}
